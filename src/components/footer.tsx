"use client";

import { useEffect, useId, useMemo, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

const W = 1920;
const H = 420;
const HORIZON = 238;
const X0 = -70;
const XW = W + 140;
const TAU = Math.PI * 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const n1 = (v: number) => Math.round(v * 10) / 10;
const f3 = (v: number) => v.toFixed(3);

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bez = (p: number[][], s: number) => {
  const u = 1 - s;
  const c = (i: number) =>
    u * u * u * p[0][i] +
    3 * u * u * s * p[1][i] +
    3 * u * s * s * p[2][i] +
    s * s * s * p[3][i];
  return [c(0), c(1)];
};

const PETAL = "M0,-34C14,-50 18,-82 0,-100C-18,-82 -14,-50 0,-34Z";
const BRACT = "M0,-8C14,-22 17,-46 0,-68C-17,-46 -14,-22 0,-8Z";
const LEAF = "M0,0C4,-26 44,-38 84,-4C50,28 8,22 0,0Z";

const dot = (x: number, y: number, r: number) =>
  `M${n1(x - r)},${n1(y)}a${f3(r)},${f3(r)} 0 1,0 ${f3(2 * r)},0a${f3(r)},${f3(r)} 0 1,0 ${f3(-2 * r)},0`;

const SEED_D = (() => {
  const g = ["", "", ""];
  for (let i = 0; i < 190; i++) {
    const r = 2.75 * Math.sqrt(i + 0.5);
    const a = i * GOLDEN;
    g[i % 3] += dot(Math.cos(a) * r, Math.sin(a) * r, 1 + r * 0.03);
  }
  return g;
})();
const FLORET_D = Array.from({ length: 40 }, (_, i) =>
  dot(Math.cos((i / 40) * TAU) * 38.6, Math.sin((i / 40) * TAU) * 38.6, 1.5),
).join("");
const STAR = Array.from({ length: 32 }, (_, i) => {
  const r = i % 2 ? 62 : 100;
  const a = (i / 32) * TAU;
  return `${n1(Math.cos(a) * r)},${n1(Math.sin(a) * r)}`;
}).join(" ");
const BALE_SPIRAL = (() => {
  let d = "";
  for (let a = 0; a < TAU * 6; a += 0.22) {
    const r = 4 + 92 * (a / (TAU * 6));
    d += `${a ? "L" : "M"}${n1(Math.cos(a) * r)},${n1(Math.sin(a) * r)}`;
  }
  return d;
})();

const stop = (o: number | string, c: string, op = 1) => (
  <stop offset={o} stopColor={c} stopOpacity={op} />
);

const petRow = (count: number, off: number, sx: number, sy: number, jit: number) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((i + off) * 360) / count + Math.sin(i * 12.9898) * jit;
    const s = 1 + Math.sin(i * 78.233) * 0.06;
    return (
      <path
        key={i}
        d={PETAL}
        transform={`rotate(${n1(a)}) scale(${f3(sx * s)} ${f3(sy * s)})`}
      />
    );
  });

const WING_COLORS = [
  ["#f7a82e", "#ee7f12", "#d9620a"],
  ["#ffc15a", "#e9693a", "#b83b2b"],
  ["#9fe3f5", "#48aade", "#2768a8"],
  ["#f9c2de", "#dd6fa6", "#9d3a70"],
];

type InsectBase = {
  x: number;
  y: number;
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  p: number;
  s: number;
};

type BeeSpec = InsectBase & { kind: "bee" };
type ButterflySpec = InsectBase & {
  kind: "bf";
  variant: number;
  flap: number;
  flapDelay: number;
  fold: number;
};

const INSECTS: (BeeSpec | ButterflySpec)[] = [
  {
    kind: "bf",
    x: 610,
    y: 150,
    ax: 150,
    ay: 36,
    fx: 0.19,
    fy: 0.33,
    p: 0,
    s: 0.62,
    variant: 0,
    flap: 0.53,
    flapDelay: -0.17,
    fold: 0.16,
  },
  {
    kind: "bf",
    x: 1250,
    y: 126,
    ax: 190,
    ay: 46,
    fx: 0.15,
    fy: 0.27,
    p: 2,
    s: 0.52,
    variant: 1,
    flap: 0.62,
    flapDelay: -0.39,
    fold: 0.22,
  },
  {
    kind: "bf",
    x: 300,
    y: 112,
    ax: 220,
    ay: 52,
    fx: 0.12,
    fy: 0.21,
    p: 4.2,
    s: 0.88,
    variant: 2,
    flap: 0.74,
    flapDelay: -0.51,
    fold: 0.26,
  },
  {
    kind: "bf",
    x: 870,
    y: 98,
    ax: 118,
    ay: 28,
    fx: 0.26,
    fy: 0.4,
    p: 1.1,
    s: 0.34,
    variant: 3,
    flap: 0.38,
    flapDelay: -0.08,
    fold: 0.12,
  },
  { kind: "bee", x: 430, y: 305, ax: 58, ay: 26, fx: 1.1, fy: 1.7, p: 1, s: 1 },
  {
    kind: "bee",
    x: 980,
    y: 335,
    ax: 70,
    ay: 30,
    fx: 0.9,
    fy: 1.5,
    p: 3,
    s: 1.1,
  },
  {
    kind: "bee",
    x: 1470,
    y: 292,
    ax: 52,
    ay: 24,
    fx: 1.3,
    fy: 1.9,
    p: 5,
    s: 0.95,
  },
  {
    kind: "bee",
    x: 1130,
    y: 392,
    ax: 44,
    ay: 20,
    fx: 1.2,
    fy: 2.1,
    p: 2.4,
    s: 1.15,
  },
];

function blades(
  R: () => number,
  n: number,
  hmin: number,
  hmax: number,
  wmax: number,
) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = X0 + R() * XW;
    const h = lerp(hmin, hmax, R());
    const w = lerp(1.5, wmax, R());
    const c = (R() - 0.5) * h * 0.55;
    d += `M${n1(x - w)},${H + 8}Q${n1(x - w + c * 0.3)},${n1(H - h * 0.55)} ${n1(x + c)},${n1(H - h)}Q${n1(x + w + c * 0.3)},${n1(H - h * 0.5)} ${n1(x + w)},${H + 8}Z`;
  }
  return d;
}

type FlowerSpec = {
  x: number;
  b: number;
  hy: number;
  r: number;
  lean: number;
  v: "head" | "tilt" | "back" | "bud" | "dried" | "lite";
  ang?: number;
};

function buildScene(seed: number) {
  const R = rng(seed);
  const rr = (a: number, b: number) => a + (b - a) * R();

  const far: FlowerSpec[] = [];
  for (let i = 0; i < 100; i++) {
    const b = rr(256, 322);
    const t = (b - 256) / 66;
    const r = lerp(5, 11, t) * rr(0.85, 1.15);
    far.push({
      x: X0 + (i + R()) * (XW / 100),
      b,
      hy: b - r * rr(2.4, 4.6),
      r,
      lean: rr(-5, 5),
      v: "lite",
    });
  }
  far.sort((a, b) => a.b - b.b);

  const mid: FlowerSpec[] = [];
  for (let i = 0; i < 38; i++) {
    const b = rr(326, 440);
    const t = (b - 326) / 114;
    const q = R();
    mid.push({
      x: X0 + (i + R()) * (XW / 38),
      b,
      hy: b - lerp(80, 190, t) * rr(0.8, 1.2),
      r: lerp(15, 31, t) * rr(0.9, 1.1),
      lean: rr(-16, 16),
      v: q < 0.66 ? "head" : q < 0.88 ? "tilt" : "back",
    });
  }
  mid.sort((a, b) => a.b - b.b);

  const near: FlowerSpec[] = [];
  const NN = 15;
  for (let i = 0; i < NN; i++) {
    const r = rr(46, 70);
    const q = R();
    const x = X0 + (i + 0.2 + R() * 0.6) * (XW / NN);
    let hy = Math.max(rr(95, 345), r + 16);
    if (x > 1630 && x < 1870) hy = Math.max(hy, 440);
    near.push({
      x,
      b: rr(548, 582),
      hy,
      r,
      lean: rr(-34, 34),
      v: q < 0.5 ? "head" : q < 0.74 ? "tilt" : "back",
    });
  }
  near.push({ x: 395, b: 572, hy: 150, r: 40, lean: 14, v: "bud" });
  near.push({ x: 1585, b: 572, hy: 205, r: 36, lean: -12, v: "bud" });
  near.push({
    x: 1688,
    b: 580,
    hy: 424,
    r: 36,
    lean: -42,
    v: "dried",
    ang: -62,
  });
  near.sort((a, b) => a.b - b.b);

  const motes = Array.from({ length: 46 }, () => ({
    x: rr(0, W),
    y: rr(130, 500),
    r: rr(2, 5.5),
    dur: rr(10, 22),
    delay: -rr(0, 22),
    mx: rr(-70, 70),
    my: rr(60, 170),
  }));
  const loose = Array.from({ length: 8 }, () => ({
    x: rr(40, 1880),
    y: rr(488, 514),
    rot: rr(0, 360),
    s: rr(0.22, 0.34),
  }));

  return {
    far,
    mid,
    near,
    motes,
    loose,
    grassBack: blades(R, 190, 18, 62, 3.2),
    grassFront: blades(R, 120, 34, 104, 4.6),
  };
}

type Band = "near" | "mid" | "far";

const BAND: Record<Band, { stem: string[]; sway: number[]; dur: number[] }> = {
  near: { stem: ["#3d6f24", "#86b551"], sway: [1.5, 2.6], dur: [5.2, 6.4] },
  mid: { stem: ["#5b8a3a", "#93bd62"], sway: [1.0, 1.9], dur: [4.6, 5.6] },
  far: { stem: ["#8fb06a", "#b3cf86"], sway: [0, 0], dur: [0, 0] },
};
const HEAD_ID: Record<string, string> = {
  head: "head",
  tilt: "head",
  back: "back",
  bud: "bud",
  dried: "dried",
  lite: "lite",
};

function Flower({
  d,
  band,
  p,
}: {
  d: FlowerSpec;
  band: Band;
  p: (n: string) => string;
}) {
  const { x, b, hy, r, lean, v } = d;
  const rnd = rng((x * 73 + b * 31) | 0);
  const h = b - hy;
  const wob = (rnd() - 0.5) * (band === "near" ? 30 : band === "mid" ? 20 : 9);
  const wob2 = (rnd() - 0.5) * (band === "near" ? 18 : band === "mid" ? 11 : 5);
  const P = [
    [x, b],
    [x - lean * 0.15 + wob * 0.45, b - h * 0.38],
    [x + lean * 0.55 + wob, hy + h * 0.3],
    [x + lean + wob2, hy],
  ];
  const stemD = `M${n1(P[0][0])},${n1(P[0][1])}C${n1(P[1][0])},${n1(P[1][1])} ${n1(P[2][0])},${n1(P[2][1])} ${n1(P[3][0])},${n1(P[3][1])}`;
  const ang =
    clamp(
      (Math.atan2(P[3][0] - P[2][0], P[2][1] - P[3][1]) * 180) / Math.PI,
      -34,
      34,
    ) + (d.ang || 0);
  const B = BAND[band];
  const sw =
    band === "near" ? 4 + r * 0.045 : band === "mid" ? 1.4 + r * 0.05 : 1;
  const k = v === "bud" ? r / 40 : r / 100;

  const nLeaves =
    band === "near" ? 3 + ((rnd() * 2) | 0) : band === "mid" ? 2 : 0;
  const leaves = [];
  for (let i = 0; i < nLeaves; i++) {
    const s = lerp(0.16, 0.62, (i + rnd() * 0.6) / nLeaves);
    const [px, py] = bez(P, s);
    const side = (i + ((rnd() * 2) | 0)) % 2 ? 1 : -1;
    const ls = (r / 62) * lerp(0.85, 1.2, rnd()) * (band === "mid" ? 1.1 : 1);
    leaves.push(
      <g
        key={i}
        className="sfl-sway"
        style={
          {
            transformOrigin: `${n1(px)}px ${n1(py)}px`,
            "--a": 2.5 + rnd() * 2,
            animationDuration: `${3.4 + rnd() * 1.6}s`,
            animationDelay: `${-rnd() * 5}s`,
          } as CSSProperties
        }
      >
        <use
          href={`#${p("leaf")}`}
          transform={`translate(${n1(px)} ${n1(py)}) scale(${side} 1) rotate(${n1(-8 + rnd() * 38)}) scale(${f3(ls)})`}
        />
      </g>,
    );
  }

  const animated = band !== "far";
  const swayStyle: CSSProperties | undefined = animated
    ? ({
        transformOrigin: `${x}px ${b}px`,
        "--a": lerp(B.sway[0], B.sway[1], rnd()),
        animationDuration: `${lerp(B.dur[0], B.dur[1], rnd())}s`,
        animationDelay: `${-(x / W) * 3.2 - rnd() * 0.6}s`,
      } as CSSProperties)
    : undefined;

  return (
    <g className={animated ? "sfl-sway" : undefined} style={swayStyle}>
      <path
        d={stemD}
        fill="none"
        stroke={B.stem[0]}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {animated && (
        <path
          d={stemD}
          fill="none"
          stroke={B.stem[1]}
          strokeWidth={sw * 0.35}
          strokeLinecap="round"
          transform={`translate(${n1(sw * 0.18)} 0)`}
          opacity=".8"
        />
      )}
      {leaves}
      <g
        transform={`translate(${n1(P[3][0])} ${n1(P[3][1])}) rotate(${n1(ang)})`}
      >
        <g
          className={animated ? "sfl-sway" : undefined}
          style={
            animated
              ? ({
                  "--a": 3 + rnd() * 2.5,
                  animationDuration: `${3.6 + rnd() * 1.6}s`,
                  animationDelay: `${-rnd() * 5}s`,
                } as CSSProperties)
              : undefined
          }
        >
          <use href={`#${p(HEAD_ID[v])}`} transform={`scale(${f3(k)})`} />
        </g>
      </g>
    </g>
  );
}

const Butterfly = ({
  gref,
  p,
  slow = false,
  variant = 0,
  flap,
  delay = 0,
  fold,
  transform,
}: {
  gref?: (el: SVGGElement | null) => void;
  p: (n: string) => string;
  slow?: boolean;
  variant?: number;
  flap?: number;
  delay?: number;
  fold?: number;
  transform?: string;
}) => (
  <g ref={gref} transform={transform}>
    <g
      className={slow ? "sfl-flap sfl-slow" : "sfl-flap"}
      style={{
        ...(flap != null ? { animationDuration: `${flap}s` } : null),
        ...(delay ? { animationDelay: `${delay}s` } : null),
        ...(fold != null ? { "--flapmin": fold } : null),
      }}
    >
      <use href={`#${p(`wing${variant % WING_COLORS.length}`)}`} />
      <use
        href={`#${p(`wing${variant % WING_COLORS.length}`)}`}
        transform="scale(-1 1)"
      />
    </g>
    <ellipse cy="2" rx="2.2" ry="15" fill="#17110a" />
    <circle cy="-13" r="2.6" fill="#17110a" />
    <path
      d="M-.8,-14C-6,-26 -10,-28 -13,-27M.8,-14C6,-26 10,-28 13,-27"
      stroke="#17110a"
      strokeWidth=".9"
      fill="none"
    />
  </g>
);

const Bee = ({
  gref,
  p,
  transform,
}: {
  gref?: (el: SVGGElement | null) => void;
  p: (n: string) => string;
  transform?: string;
}) => (
  <g ref={gref} transform={transform}>
    <g className="sfl-wing">
      <ellipse
        cx="-1"
        cy="-7"
        rx="7"
        ry="3.4"
        transform="rotate(-22 -1 -4)"
        fill="#fff"
        opacity=".62"
      />
      <ellipse
        cx="2"
        cy="-7"
        rx="6"
        ry="3"
        transform="rotate(12 2 -4)"
        fill="#fff"
        opacity=".5"
      />
    </g>
    <ellipse rx="8" ry="5.2" fill={`url(#${p("bee")})`} />
    <path d="M-1,-4.8V4.8M3.8,-4.4V4.4" stroke="#2a1a05" strokeWidth="2.2" />
    <circle cx="8.8" r="3.3" fill="#2a1a05" />
  </g>
);

export function SunflowerHead({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const p = (n: string) => `${uid}-${n}`;
  const u = (n: string) => `url(#${uid}-${n})`;

  return (
    <svg viewBox="-112 -112 224 224" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={p("pb")} x1="0" y1="1" x2="0" y2="0">
          {stop(0, "#e58a0a")}
          {stop(0.55, "#f7b91a")}
          {stop(1, "#ffd93f")}
        </linearGradient>
        <linearGradient id={p("pf")} x1="0" y1="1" x2="0" y2="0">
          {stop(0, "#f0a010")}
          {stop(0.5, "#ffc825")}
          {stop(1, "#ffe45c")}
        </linearGradient>
        <radialGradient id={p("diskG")}>
          {stop(0, "#2e1a0a")}
          {stop(0.55, "#46280e")}
          {stop(0.85, "#6a4214")}
          {stop(1, "#a8741c")}
        </radialGradient>
        <radialGradient id={p("diskHi")} cx=".35" cy=".3" r=".75">
          {stop(0, "#fff", 0.28)}
          {stop(0.5, "#fff", 0.04)}
          {stop(1, "#000", 0.28)}
        </radialGradient>
        <g
          id={p("petB")}
          fill={u("pb")}
          stroke="#c97f0a"
          strokeOpacity=".45"
          strokeWidth=".9"
        >
          {petRow(23, 0, 1.04, 1.04, 3)}
        </g>
        <g
          id={p("petF")}
          fill={u("pf")}
          stroke="#d98a0c"
          strokeOpacity=".4"
          strokeWidth=".8"
        >
          {petRow(23, 0.5, 0.94, 0.94, 3)}
        </g>
        <g id={p("disk")}>
          <circle r="42" fill="#7a4a12" />
          <circle r="40" fill={u("diskG")} />
          <path d={SEED_D[0]} fill="#241308" />
          <path d={SEED_D[1]} fill="#3d230d" />
          <path d={SEED_D[2]} fill="#5e3a14" />
          <path d={FLORET_D} fill="#d9962a" opacity=".85" />
          <circle r="40" fill={u("diskHi")} />
        </g>
        <g id={p("head")}>
          <use href={`#${p("petB")}`} />
          <use href={`#${p("petF")}`} />
          <circle r="47" fill="#a85f08" opacity=".55" />
          <use href={`#${p("disk")}`} />
        </g>
      </defs>
      <use href={`#${p("head")}`} />
    </svg>
  );
}

export default function Footer({
  seed = 1552003,
  animated = true,
  parallax = true,
  className = "",
  style = {},
  label = "A sunflower field in warm morning light",
}: {
  seed?: number;
  animated?: boolean;
  parallax?: boolean;
  className?: string;
  style?: CSSProperties;
  label?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const p = (n: string) => `${uid}-${n}`;
  const u = (n: string) => `url(#${uid}-${n})`;
  const scene = useMemo(() => buildScene(seed), [seed]);
  const wrap = useRef<HTMLDivElement | null>(null);
  const insectRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const reduce =
      !animated ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      INSECTS.forEach((c, k) => {
        const el = insectRefs.current[k];
        if (!el) return;
        const px = (tt: number) =>
          c.x +
          c.ax * Math.sin(c.fx * tt + c.p) +
          c.ax * 0.28 * Math.sin(c.fx * 2.7 * tt + c.p * 2) +
          c.ax * 0.13 * Math.sin(c.fx * 5.3 * tt + c.p * 4.7);
        const py = (tt: number) =>
          c.y +
          c.ay * Math.sin(c.fy * tt + c.p * 1.6) +
          c.ay * 0.18 * Math.sin(c.fy * 3.4 * tt + c.p * 3.3);
        const tt = t + 0.45 * Math.sin(t * 0.31 + c.p * 2.2);
        const x = px(tt);
        const y = py(tt);
        const x2 = px(tt + 0.02);
        const y2 = py(tt + 0.02);
        const dx = (x2 - x) / 0.02;
        const dy = (y2 - y) / 0.02;
        const pos = `translate(${x.toFixed(1)} ${y.toFixed(1)})`;
        if (c.kind === "bee") {
          const a = clamp(
            (Math.atan2(dy, Math.abs(dx)) * 180) / Math.PI,
            -35,
            35,
          );
          el.setAttribute(
            "transform",
            `${pos} scale(${dx < 0 ? -c.s : c.s} ${c.s}) rotate(${a.toFixed(1)})`,
          );
        } else {
          const wobble = Math.sin(t * 0.9 + c.p * 3.1) * 5;
          el.setAttribute(
            "transform",
            `${pos} rotate(${(clamp(dx * 0.55, -20, 20) + wobble).toFixed(1)}) scale(${c.s})`,
          );
        }
      });
    };
    const loop = (now: number) => {
      tick(now);
      raf = requestAnimationFrame(loop);
    };

    // Only animate while the field is on screen
    let io: IntersectionObserver | undefined;
    if (!reduce && wrap.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          cancelAnimationFrame(raf);
          if (!wrap.current) return;
          wrap.current.classList.toggle("sfl-idle", !entry.isIntersecting);
          if (entry.isIntersecting) raf = requestAnimationFrame(loop);
        },
        { rootMargin: "120px 0px" },
      );
      io.observe(wrap.current);
      wrap.current.classList.add("sfl-idle");
    } else {
      // Reduced motion: draw one still frame, no loop
      tick(performance.now());
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [animated]);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!parallax || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    wrap.current.style.setProperty(
      "--px",
      String(((e.clientX - r.left) / r.width) * 2 - 1),
    );
  };
  const onLeave = () =>
    wrap.current && wrap.current.style.setProperty("--px", "0");

  const layer = (kk: number) => ({
    className: "sfl-layer",
    style: { "--k": kk } as CSSProperties,
  });

  return (
    <div
      ref={wrap}
      className={`sfl-root ${animated ? "" : "sfl-still"} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${W} / ${H}`,
        overflow: "hidden",
        ...style,
      }}
    >
      <style>{CSS}</style>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={label}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id={p("sky")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#f5f5f5")}
            {stop(0.3, "#f5f5f5")}
            {stop(0.5, "#bfe1f3")}
            {stop(0.68, "#8fc7ea")}
            {stop(0.82, "#d3ebf0")}
            {stop(1, "#fff0c4")}
          </linearGradient>
          <linearGradient id={p("ground")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#cfd47c")}
            {stop(0.12, "#a9be55")}
            {stop(0.45, "#6c9632")}
            {stop(0.8, "#447426")}
            {stop(1, "#2f5a1f")}
          </linearGradient>
          <linearGradient id={p("groundFar")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#c6d477")}
            {stop(0.45, "#a2bf55")}
            {stop(1, "#7fa33f")}
          </linearGradient>
          <linearGradient id={p("groundMid")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#91b84f")}
            {stop(0.5, "#6f9c36")}
            {stop(1, "#527f29")}
          </linearGradient>
          <linearGradient id={p("groundNear")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#72a03a")}
            {stop(0.5, "#4f7d29")}
            {stop(1, "#345f20")}
          </linearGradient>
          <linearGradient id={p("groundDeep")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#4a7627")}
            {stop(1, "#234818")}
          </linearGradient>
          <linearGradient id={p("carpet")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#e8c443", 0)}
            {stop(0.5, "#e6bf34", 0.8)}
            {stop(1, "#c9ab3a", 0)}
          </linearGradient>
          <linearGradient id={p("mist")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#fff3d0", 0)}
            {stop(0.3, "#fff3d0", 0.65)}
            {stop(1, "#fff3d0", 0)}
          </linearGradient>
          <linearGradient id={p("mist2")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#fff3d0", 0)}
            {stop(0.4, "#fff3d0", 0.2)}
            {stop(1, "#fff3d0", 0)}
          </linearGradient>
          <radialGradient id={p("vig")} cx=".5" cy=".5" r=".75">
            {stop(0.6, "#0e2416", 0)}
            {stop(1, "#0e2416", 0.34)}
          </radialGradient>
          <linearGradient id={p("topFade")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#000")}
            {stop(0.12, "#262626")}
            {stop(0.26, "#8f8f8f")}
            {stop(0.38, "#e6e6e6")}
            {stop(0.46, "#fff")}
          </linearGradient>
          <mask
            id={p("topMask")}
            maskUnits="userSpaceOnUse"
            x={X0}
            y="0"
            width={XW}
            height={H}
          >
            <rect x={X0} y="0" width={XW} height={H} fill={u("topFade")} />
          </mask>
          <linearGradient id={p("vigFade")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#000")}
            {stop(0.46, "#000")}
            {stop(0.62, "#737373")}
            {stop(0.8, "#fff")}
          </linearGradient>
          <mask
            id={p("vigMask")}
            maskUnits="userSpaceOnUse"
            x={X0}
            y="0"
            width={XW}
            height={H}
          >
            <rect x={X0} y="0" width={XW} height={H} fill={u("vigFade")} />
          </mask>
          <linearGradient id={p("floor")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#0a1e0a", 0)}
            {stop(1, "#0a1e0a", 0.38)}
          </linearGradient>
          <linearGradient id={p("pb")} x1="0" y1="1" x2="0" y2="0">
            {stop(0, "#e58a0a")}
            {stop(0.55, "#f7b91a")}
            {stop(1, "#ffd93f")}
          </linearGradient>
          <linearGradient id={p("pf")} x1="0" y1="1" x2="0" y2="0">
            {stop(0, "#f0a010")}
            {stop(0.5, "#ffc825")}
            {stop(1, "#ffe45c")}
          </linearGradient>
          <radialGradient id={p("diskG")}>
            {stop(0, "#2e1a0a")}
            {stop(0.55, "#46280e")}
            {stop(0.85, "#6a4214")}
            {stop(1, "#a8741c")}
          </radialGradient>
          <radialGradient id={p("diskHi")} cx=".35" cy=".3" r=".75">
            {stop(0, "#fff", 0.28)}
            {stop(0.5, "#fff", 0.04)}
            {stop(1, "#000", 0.28)}
          </radialGradient>
          <linearGradient id={p("leafG")} x1="0" y1="0" x2="1" y2="0">
            {stop(0, "#2a5e24")}
            {stop(0.6, "#4a8f31")}
            {stop(1, "#78b447")}
          </linearGradient>
          <linearGradient id={p("bract")} x1="0" y1="1" x2="0" y2="0">
            {stop(0, "#3d6e25")}
            {stop(1, "#86b84a")}
          </linearGradient>
          <linearGradient id={p("sepal")} x1="0" y1="1" x2="0" y2="0">
            {stop(0, "#3a6a22")}
            {stop(1, "#79ad40")}
          </linearGradient>
          <radialGradient id={p("hay")} cx=".42" cy=".38" r=".7">
            {stop(0, "#f3d983")}
            {stop(0.6, "#dcb457")}
            {stop(1, "#b98a34")}
          </radialGradient>
          {WING_COLORS.map(([top, mid, base], i) => (
            <radialGradient
              key={i}
              id={p(`wingFill${i}`)}
              cx=".1"
              cy=".5"
              r="1"
            >
              {stop(0, top)}
              {stop(0.6, mid)}
              {stop(1, base)}
            </radialGradient>
          ))}
          <linearGradient id={p("bee")} x1="0" y1="0" x2="0" y2="1">
            {stop(0, "#ffd23a")}
            {stop(1, "#e8a010")}
          </linearGradient>
          <radialGradient id={p("glow")}>
            {stop(0, "#fff8cf", 0.95)}
            {stop(1, "#ffe89a", 0)}
          </radialGradient>
          <linearGradient id={p("grassB")} x1="0" y1="1" x2="0" y2="0">
            {stop(0, "#1f4318")}
            {stop(1, "#4d8a2e")}
          </linearGradient>
          <linearGradient id={p("grassF")} x1="0" y1="1" x2="0" y2="0">
            {stop(0, "#2a5a1d")}
            {stop(0.6, "#4f9a2f")}
            {stop(1, "#9bd155")}
          </linearGradient>
          <filter id={p("blur")} x="-3%" y="-10%" width="106%" height="120%">
            <feGaussianBlur stdDeviation=".9" />
          </filter>

          <g
            id={p("petB")}
            fill={u("pb")}
            stroke="#c97f0a"
            strokeOpacity=".45"
            strokeWidth=".9"
          >
            {petRow(23, 0, 1.04, 1.04, 3)}
          </g>
          <g
            id={p("petF")}
            fill={u("pf")}
            stroke="#d98a0c"
            strokeOpacity=".4"
            strokeWidth=".8"
          >
            {petRow(23, 0.5, 0.94, 0.94, 3)}
          </g>
          <g id={p("disk")}>
            <circle r="42" fill="#7a4a12" />
            <circle r="40" fill={u("diskG")} />
            <path d={SEED_D[0]} fill="#241308" />
            <path d={SEED_D[1]} fill="#3d230d" />
            <path d={SEED_D[2]} fill="#5e3a14" />
            <path d={FLORET_D} fill="#d9962a" opacity=".85" />
            <circle r="40" fill={u("diskHi")} />
          </g>
          <g id={p("head")}>
            <use href={`#${p("petB")}`} />
            <use href={`#${p("petF")}`} />
            <circle r="47" fill="#a85f08" opacity=".55" />
            <use href={`#${p("disk")}`} />
          </g>
          <g id={p("back")}>
            <use href={`#${p("petB")}`} />
            <circle r="62" fill="#2f5a1c" />
            <g
              fill={u("bract")}
              stroke="#1e3e10"
              strokeOpacity=".5"
              strokeWidth="1"
            >
              {Array.from({ length: 18 }, (_, i) => (
                <path key={i} d={BRACT} transform={`rotate(${i * 20})`} />
              ))}
              {Array.from({ length: 14 }, (_, i) => (
                <path
                  key={i}
                  d={BRACT}
                  transform={`rotate(${i * (360 / 14) + 12}) scale(.7)`}
                />
              ))}
            </g>
            <circle r="13" fill="#2b4f19" />
          </g>
          <g id={p("dried")}>
            {Array.from({ length: 7 }, (_, i) => (
              <path
                key={i}
                d={PETAL}
                transform={`rotate(${i * 51 + 10}) scale(.5)`}
                fill="#8a5a1c"
                opacity=".85"
              />
            ))}
            <use href={`#${p("disk")}`} />
            <circle r="40" fill="#3a2410" opacity=".42" />
          </g>
          <g id={p("bud")}>
            <path d="M-15,-14C-12,-58 12,-58 15,-14Z" fill="#f5c32c" />
            <path
              d="M-10,-30C-4,-52 4,-52 10,-30Z"
              fill="#e89c10"
              opacity=".7"
            />
            {[-50, -25, 0, 25, 50].map((a) => (
              <path
                key={a}
                d="M0,8C11,-8 13,-34 0,-58C-13,-34 -11,-8 0,8Z"
                transform={`rotate(${a})`}
                fill={u("sepal")}
                stroke="#25481a"
                strokeOpacity=".4"
                strokeWidth=".8"
              />
            ))}
            <circle cy="10" r="16" fill="#3e6d24" />
          </g>
          <g id={p("lite")}>
            <polygon points={STAR} fill="#f4b712" />
            <circle r="46" fill="#5a3512" />
            <circle r="46" fill={u("diskHi")} opacity=".6" />
          </g>
          <g id={p("leaf")}>
            <path d={LEAF} fill={u("leafG")} />
            <path
              d="M0,0Q42,-4 84,-4C50,28 8,22 0,0Z"
              fill="#00280a"
              opacity=".16"
            />
            <path
              d="M0,0Q40,-8 80,-3M20,-3Q34,-16 46,-22M20,-2Q34,10 46,14M42,-5Q54,-14 64,-17M42,-4Q54,6 62,8"
              stroke="#d5eca6"
              strokeOpacity=".5"
              strokeWidth="1.1"
              fill="none"
            />
          </g>
          {WING_COLORS.map((_, wi) => (
            <g
              key={wi}
              id={p(`wing${wi}`)}
              stroke="#17110a"
              strokeWidth="2.2"
              strokeLinejoin="round"
            >
              <path
                d="M3,-3C10,-26 38,-40 56,-26C62,-14 44,2 5,4Z"
                fill={u(`wingFill${wi}`)}
              />
              <path
                d="M4,4C30,2 40,16 32,30C22,36 8,26 4,10Z"
                fill={u(`wingFill${wi}`)}
              />
              <path
                d="M4,0L50,-22M4,0L46,-8M4,1L40,-31M5,6L28,12M5,7L24,24"
                stroke="#17110a"
                strokeWidth="1.1"
                fill="none"
              />
              <g fill="#fff" stroke="none">
                {[
                  [47, -31],
                  [55, -24],
                  [58, -14],
                  [50, -5],
                  [36, 19],
                  [32, 28],
                  [25, 32],
                ].map(([x, y]) => (
                  <circle key={`${x}${y}`} cx={x} cy={y} r="1.4" />
                ))}
              </g>
            </g>
          ))}
        </defs>

        <g {...layer(1)} mask={u("topMask")}>
          <rect x={X0} y="0" width={XW} height={HORIZON + 80} fill={u("sky")} />
        </g>

        <g {...layer(2)}>
          <path
            d={`M${X0},232C180,214 350,222 540,228S900,210 1120,226S1500,214 1700,232S1880,220 ${W + 70},228L${W + 70},262L${X0},262Z`}
            fill="#b9d2b3"
            opacity=".9"
          />
          <path
            d={`M${X0},244C220,226 430,238 650,232S1050,220 1290,240S1650,226 1820,242S1930,236 ${W + 70},240L${W + 70},272L${X0},272Z`}
            fill="#9fbf88"
          />
          <path
            d={`M${X0},252C240,238 470,250 700,244S1120,232 1360,250S1700,238 1840,250S1950,246 ${W + 70},250L${W + 70},282L${X0},282Z`}
            fill="#8aae72"
            opacity=".9"
          />
          {[130, 190, 305, 560, 640, 900, 1020, 1330, 1450, 1640, 1790].map(
            (x, i) => (
              <ellipse
                key={x}
                cx={x}
                cy={234 + (i % 5)}
                rx={7 + (i % 4) * 2}
                ry={5 + (i % 3)}
                fill="#6f9a74"
                opacity=".85"
              />
            ),
          )}
          <g transform="translate(1180 232)">
            <rect width="16" height="9" fill="#b5483b" />
            <path d="M-2,0L8,-7L18,0Z" fill="#6b3a30" />
            <rect x="19" y="-5" width="4" height="14" fill="#c9c2b0" />
          </g>
          <path
            d={`M${X0},246C260,238 520,258 800,250S1380,236 1600,254S1860,244 ${W + 70},252L${W + 70},${H}L${X0},${H}Z`}
            fill={u("groundFar")}
          />
          <path
            d={`M${X0},248C250,258 480,242 760,252S1320,264 1560,248S1840,242 ${W + 70},256L${W + 70},284C1800,278 1600,292 1400,280S900,264 700,278S220,290 ${X0},276Z`}
            fill={u("carpet")}
          />
          <path
            d={`M${X0},312C240,292 500,332 760,318S1260,288 1520,320S1820,300 ${W + 70},314L${W + 70},${H}L${X0},${H}Z`}
            fill={u("groundMid")}
          />
          <path
            d={`M${X0},312C240,292 500,332 760,318S1260,288 1520,320S1820,300 ${W + 70},314`}
            fill="none"
            stroke="#d9e99a"
            strokeOpacity=".16"
            strokeWidth="3"
          />
          <path
            d={`M${X0},378C280,344 560,392 860,370S1340,352 1560,386S1840,360 ${W + 70},372L${W + 70},${H}L${X0},${H}Z`}
            fill={u("groundNear")}
          />
          <path
            d={`M${X0},378C280,344 560,392 860,370S1340,352 1560,386S1840,360 ${W + 70},372`}
            fill="none"
            stroke="#cfe287"
            strokeOpacity=".14"
            strokeWidth="3"
          />
          <path
            d={`M${X0},400C320,382 640,412 980,398S1540,384 1780,406S1920,396 ${W + 70},400L${W + 70},${H}L${X0},${H}Z`}
            fill={u("groundDeep")}
            opacity=".85"
          />
          <g stroke="#27470f" strokeOpacity=".1" strokeWidth="2">
            {Array.from({ length: 25 }, (_, i) => {
              const o = i - 12;
              return (
                <path
                  key={i}
                  d={`M960,${HORIZON + 4}Q${960 + o * 150},300 ${960 + o * 260},${H + 8}`}
                  fill="none"
                />
              );
            })}
          </g>
        </g>

        <g {...layer(3)}>
          <g className="sfl-farwind">
            <g filter={u("blur")}>
              {scene.far.map((d, i) => (
                <Flower key={i} d={d} band="far" p={p} />
              ))}
            </g>
          </g>
        </g>
        <rect
          x={X0}
          y={HORIZON - 14}
          width={XW}
          height="130"
          fill={u("mist")}
        />

        <g {...layer(8)}>
          {scene.mid.map((d, i) => (
            <Flower key={i} d={d} band="mid" p={p} />
          ))}
        </g>
        <rect x={X0} y="300" width={XW} height="120" fill={u("mist2")} />

        <g {...layer(12)}>
          <g transform="translate(1590 442) scale(.5)" opacity=".92">
            <circle r="100" fill={u("hay")} stroke="#a67a28" strokeWidth="3" />
            <path
              d={BALE_SPIRAL}
              fill="none"
              stroke="#9c7220"
              strokeWidth="2.6"
              opacity=".5"
            />
          </g>
          <g transform="translate(1745 402)">
            <ellipse cy="94" rx="118" ry="14" fill="#28320a" opacity=".35" />
            <circle r="100" fill={u("hay")} stroke="#a67a28" strokeWidth="3" />
            <path
              d={BALE_SPIRAL}
              fill="none"
              stroke="#9c7220"
              strokeWidth="1.7"
              opacity=".55"
            />
            {[30, 52, 74, 92].map((r) => (
              <circle
                key={r}
                r={r}
                fill="none"
                stroke="#c99a3a"
                strokeWidth="2.2"
                opacity=".5"
                strokeDasharray="6 3 2 7"
              />
            ))}
            <path
              d="M-78,-62A100,100 0 0 1 40,-92"
              fill="none"
              stroke="#fff8d2"
              strokeOpacity=".7"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
          {INSECTS.map((c, k) =>
            c.kind === "bee" ? (
              <Bee
                key={k}
                p={p}
                transform={`translate(${c.x} ${c.y}) scale(${c.s})`}
                gref={(el) => {
                  insectRefs.current[k] = el;
                }}
              />
            ) : null,
          )}
        </g>

        <g {...layer(20)}>
          {scene.near.map((d, i) => (
            <Flower key={i} d={d} band="near" p={p} />
          ))}
        </g>

        <g {...layer(24)}>
          <g transform="translate(1736 308) rotate(-10) scale(.55)">
            <Butterfly
              p={p}
              slow
              variant={3}
              flap={3.1}
              delay={-1.3}
              fold={0.66}
            />
          </g>
          <g transform="translate(1788 322) rotate(14) scale(.42)">
            <Butterfly
              p={p}
              slow
              variant={1}
              flap={2.4}
              delay={-0.4}
              fold={0.55}
            />
          </g>
          {INSECTS.map((c, k) =>
            c.kind === "bf" ? (
              <Butterfly
                key={k}
                p={p}
                transform={`translate(${c.x} ${c.y}) scale(${c.s})`}
                variant={c.variant}
                flap={c.flap}
                delay={c.flapDelay}
                fold={c.fold}
                gref={(el) => {
                  insectRefs.current[k] = el;
                }}
              />
            ) : null,
          )}
        </g>

        <g {...layer(26)}>
          {scene.loose.map((l, i) => (
            <path
              key={i}
              d={PETAL}
              fill={u("pf")}
              opacity=".9"
              transform={`translate(${n1(l.x)} ${n1(l.y)}) rotate(${n1(l.rot)}) scale(${f3(l.s)} ${f3(l.s * 0.8)})`}
            />
          ))}
          <path className="sfl-grass" d={scene.grassBack} fill={u("grassB")} />
        </g>
        <g {...layer(32)}>
          <path
            className="sfl-grass"
            style={{ animationDelay: "-2.4s" }}
            d={scene.grassFront}
            fill={u("grassF")}
          />
        </g>

        {scene.motes.map((m, i) => (
          <circle
            key={i}
            className="sfl-mote"
            cx={n1(m.x)}
            cy={n1(m.y)}
            r={n1(m.r)}
            fill={u("glow")}
            style={
              {
                "--mx": `${n1(m.mx)}px`,
                "--my": `${n1(m.my)}px`,
                animationDuration: `${m.dur}s`,
                animationDelay: `${m.delay}s`,
                mixBlendMode: "screen",
              } as CSSProperties
            }
          />
        ))}

        <rect
          x={X0}
          y="0"
          width={XW}
          height={H}
          fill={u("vig")}
          mask={u("vigMask")}
        />
        <rect x={X0} y={H - 130} width={XW} height="130" fill={u("floor")} />
      </svg>
    </div>
  );
}

const CSS = `
.sfl-layer{transform:translateX(calc(var(--px,0) * var(--k,0) * -1px));transition:transform .55s cubic-bezier(.2,.7,.2,1)}
@keyframes sfl-sway{0%,100%{transform:rotate(calc(var(--a,2) * -1deg))}50%{transform:rotate(calc(var(--a,2) * 1deg))}}
.sfl-sway{animation:sfl-sway 5.5s ease-in-out infinite}
@keyframes sfl-flap{0%,100%{transform:scaleX(1)}50%{transform:scaleX(var(--flapmin,.18))}}
@keyframes sfl-flapslow{0%,100%{transform:scaleX(1)}40%,60%{transform:scaleX(var(--flapmin,.62))}}
.sfl-flap{transform-box:fill-box;transform-origin:center;animation:sfl-flap .55s ease-in-out infinite}
.sfl-slow{animation-name:sfl-flapslow;animation-duration:2.8s}
@keyframes sfl-buzz{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.3)}}
.sfl-wing{transform-box:fill-box;transform-origin:50% 100%;animation:sfl-buzz .08s linear infinite}
@keyframes sfl-mote{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}85%{opacity:.7}100%{transform:translate(var(--mx),calc(var(--my) * -1));opacity:0}}
.sfl-mote{animation:sfl-mote 14s ease-in-out infinite}
@keyframes sfl-grass{0%,100%{transform:skewX(-1.4deg)}50%{transform:skewX(1.6deg)}}
.sfl-grass{transform-origin:960px 526px;animation:sfl-grass 6s ease-in-out infinite}
@keyframes sfl-farwind{0%,100%{transform:skewX(-.5deg)}50%{transform:skewX(.6deg)}}
.sfl-farwind{transform-origin:960px 300px;animation:sfl-farwind 7s ease-in-out infinite}
.sfl-still *{animation:none!important}
.sfl-idle *{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){.sfl-root *{animation:none!important;transition:none!important}}
`;
