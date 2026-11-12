"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

const DEFAULT_CELL_SIZE = 12;
const DEFAULT_MONTHS = 12;
const WEEKS_PER_MONTH = 365.25 / 12 / 7;
const MIN_CARD_WIDTH = 320;
const MIN_LABEL_WEEKS = 3;
const gapFor = (cellSize: number) => Math.max(2, Math.round(cellSize / 4));
const weeksFor = (months: number) =>
  Math.max(1, Math.ceil(months * WEEKS_PER_MONTH));

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const TOOLTIP_EDGE = 8;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-yellow-400/12",
  1: "bg-yellow-400/30",
  2: "bg-yellow-400/50",
  3: "bg-yellow-400/75",
  4: "bg-yellow-400",
};

function toMonthLabels(weeks: Contribution[][]) {
  const labels: (string | null)[] = weeks.map(() => null);
  const monthAt = (index: number) => weeks[index]?.[0]?.date.slice(5, 7);

  let start = 0;
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue;
    if (i - start >= MIN_LABEL_WEEKS) {
      labels[start] = MONTH_NAMES[Number(monthAt(start)) - 1] ?? null;
    }
    start = i;
  }

  return labels;
}

type HoveredDay = { day: Contribution; x: number; y: number };

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function describeDay({ count, date }: Contribution) {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`;
}

const CALENDAR_API = "https://github-contributions-api.jogruber.de/v4";

type ApiDay = { date: string; count: number; level: number };

async function fetchCalendar(login: string, year?: number) {
  const res = await fetch(`${CALENDAR_API}/${login}?y=${year ?? "last"}`);
  if (!res.ok) return null;

  const days: ApiDay[] = (await res.json())?.contributions ?? [];
  if (!days.length) return null;

  const start = days.findIndex(
    (day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0,
  );

  return days.slice(start < 0 ? 0 : start).map<Contribution>((day) => ({
    date: day.date,
    count: day.count,
    level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
  }));
}

function useContributions(login?: string, year?: number) {
  const [data, setData] = React.useState<Contribution[]>();

  React.useEffect(() => {
    if (!login) return;
    let active = true;

    fetchCalendar(login, year)
      .then((contributions) => {
        if (active && contributions) setData(contributions);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [login, year]);

  return data;
}

function emptyDays(weeks: number): Contribution[] {
  // Fixed UTC anchor so the server-rendered and hydrated placeholder grids
  // always match (real dates arrive with the fetched data).
  const today = new Date(Date.UTC(2024, 0, 1));
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - (weeks * 7 - 1 - i));
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0 as ContributionLevel,
    };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

function useFittedColumns(cellSize: number, gap: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [columns, setColumns] = React.useState<number>();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () =>
      setColumns(
        Math.max(1, Math.floor((el.clientWidth + gap) / (cellSize + gap))),
      );

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cellSize, gap]);

  return [ref, columns] as const;
}

const Tooltip = ({ hovered }: { hovered: HoveredDay }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [left, setLeft] = React.useState(hovered.x);

  useIsoLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2;
    const edge = TOOLTIP_EDGE + half;
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge));
  }, [hovered]);

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left,
        top: hovered.y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <div
        ref={ref}
        className="whitespace-nowrap rounded-lg border border-neutral-200 bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 shadow-md"
      >
        {describeDay(hovered.day)}
      </div>
    </div>,
    document.body,
  );
};

const ContributionGrid = ({
  contributions,
  cellSize,
  months,
  showMonths,
  label,
}: {
  contributions: Contribution[];
  cellSize: number;
  months: number;
  showMonths: boolean;
  label: string;
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions]);
  const gap = gapFor(cellSize);
  const [ref, columns] = useFittedColumns(cellSize, gap);
  const [hovered, setHovered] = React.useState<HoveredDay>();

  const cap = Math.min(weeks.length, weeksFor(months));
  const visible = weeks.slice(-Math.min(cap, columns ?? cap));

  const hover = (day: Contribution) => (event: React.PointerEvent) => {
    const cell = event.currentTarget.getBoundingClientRect();
    setHovered({ day, x: cell.left + cell.width / 2, y: cell.top });
  };

  return (
    <div
      ref={ref}
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="relative"
    >
      {showMonths && (
        <div className="flex justify-center" style={{ gap, marginBottom: gap }}>
          {toMonthLabels(visible).map((month, index) => (
            <div
              key={index}
              className="relative h-3 shrink-0"
              style={{ width: cellSize }}
            >
              {month && (
                <span className="absolute left-0 top-0 text-[10px] leading-none text-neutral-500">
                  {month}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className="flex justify-center overflow-hidden"
        style={{ gap }}
        onPointerLeave={() => setHovered(undefined)}
      >
        {visible.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col" style={{ gap }}>
            {week.map((day) => (
              <div
                key={day.date}
                onPointerEnter={hover(day)}
                className={cn(
                  "shrink-0 rounded-[3px]",
                  LEVEL_CLASS[day.level] ?? LEVEL_CLASS[0],
                )}
                style={{ width: cellSize, height: cellSize }}
              />
            ))}
          </div>
        ))}
      </div>

      {hovered && <Tooltip hovered={hovered} />}
    </div>
  );
};

export type GitHubActivityProps = React.ComponentProps<"div"> & {
  username?: string;
  contributions?: Contribution[];
  year?: number;
  cellSize?: number;
  months?: number;
  showMonths?: boolean;
};

const GitHubActivity = ({
  className,
  username,
  contributions: contributionsProp = [],
  year,
  cellSize = DEFAULT_CELL_SIZE,
  months = DEFAULT_MONTHS,
  showMonths = false,
  style,
  ...props
}: GitHubActivityProps) => {
  const shouldFetch = contributionsProp.length === 0;
  const fetched = useContributions(
    shouldFetch ? username : undefined,
    shouldFetch ? year : undefined,
  );
  const placeholder = React.useMemo(
    () => (username ? emptyDays(weeksFor(months)) : []),
    [username, months],
  );

  const contributions = contributionsProp.length
    ? contributionsProp
    : (fetched ?? placeholder);

  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions],
  );

  const firstYear = Number(contributions[0]?.date.slice(0, 4));
  const lastYear = Number(contributions.at(-1)?.date.slice(0, 4));
  const displayYear =
    year ??
    (Number.isFinite(lastYear) && firstYear === lastYear ? lastYear : null);
  const heading = `${total.toLocaleString()} contributions${
    displayYear
      ? ` in ${displayYear}`
      : contributions.length
        ? " in the last year."
        : ""
  }`;

  const gap = gapFor(cellSize);
  const columns = Math.min(
    Math.ceil(contributions.length / 7),
    weeksFor(months),
  );
  const width = Math.max(MIN_CARD_WIDTH, columns * (cellSize + gap) - gap);

  return (
    <div
      data-slot="github-activity"
      className={cn("relative max-w-full overflow-hidden", className)}
      style={{ width, ...style }}
      {...props}
    >
      <p className="mb-3 text-sm sm:mb-4 sm:text-base">
        {heading} Source{" "}
        <Link
          className="text-neutral-800 hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400"
          href={"https://github.com/nikhil-thorat"}
        >
          GitHub
        </Link>
      </p>

      <ContributionGrid
        contributions={contributions}
        cellSize={cellSize}
        months={months}
        showMonths={showMonths}
        label={heading}
      />
    </div>
  );
};

export { GitHubActivity };
export default GitHubActivity;
