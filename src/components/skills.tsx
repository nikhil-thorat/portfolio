"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { getLenis } from "@/lib/scroll";
import StackIcon from "tech-stack-icons";

const ROW_ONE = [
  "C/C++",
  "JavaScript",
  "TypeScript",
  "Python",
  "Golang",
  "Bash",
  "HTML",
  "CSS",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
];

const ROW_TWO = [
  "Prisma",
  "Redis",
  "Kafka",
  "TailwindCSS",
  "React",
  "Nextjs",
  "Docker",
  "Kubernetes",
  "Prometheus",
  "Git",
  "GitHub",
  "Neovim",
  "Linux",
];

const SKILL_ICONS: Record<string, ReactNode> = {
  "C/C++": <StackIcon name="c++" />,
  JavaScript: <StackIcon name="js" />,
  TypeScript: <StackIcon name="typescript" />,
  Python: <StackIcon name="python" />,
  Golang: <StackIcon name="go" />,
  Bash: <StackIcon name="bash" />,
  HTML: <StackIcon name="html5" />,
  CSS: <StackIcon name="css3" />,
  PostgreSQL: <StackIcon name="postgresql" />,
  MongoDB: <StackIcon name="mongodb" />,
  Supabase: <StackIcon name="supabase" />,
  Prisma: <StackIcon name="prisma" />,
  Redis: <StackIcon name="redis" />,
  Kafka: null,
  Kubernetes: <StackIcon name="kubernetes" />,
  TailwindCSS: <StackIcon name="tailwindcss" />,
  React: <StackIcon name="react" />,
  Nextjs: <StackIcon name="nextjs2" />,
  Docker: <StackIcon name="docker" />,
  Prometheus: <StackIcon name="prometheus" />,
  Git: <StackIcon name="git" />,
  GitHub: <StackIcon name="github" />,
  Neovim: <StackIcon name="neovim" />,
  Linux: <StackIcon name="linux" />,
};

function Chip({ label }: { label: string }) {
  const icon = SKILL_ICONS[label];
  return (
    <span className="flex items-center gap-2.5 text-lg font-light whitespace-nowrap text-neutral-600 sm:gap-3 sm:text-xl">
      {icon && (
        <span className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full sm:h-6 sm:w-6">
          {icon}
        </span>
      )}
      {label}
    </span>
  );
}

function Row({
  skills,
  reverse = false,
  duration,
}: {
  skills: string[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="skills-row overflow-hidden">
      <div
        data-skills-track
        className={`skills-track w-max ${reverse ? "skills-track-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-6 pr-5 sm:gap-6 sm:pr-6"
          >
            {skills.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = Array.from(
      rootEl.querySelectorAll<HTMLElement>("[data-skills-track]"),
    );
    const rates = new Map<HTMLElement, Animation>();
    let visible = true;
    let factor = 1;
    let raf = 0;
    let lastY = window.scrollY;

    const rateOf = (track: HTMLElement) => {
      let anim = rates.get(track);
      if (!anim) {
        anim = track.getAnimations()[0];
        if (!anim) return null;
        rates.set(track, anim);
      }
      return anim;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) lastY = window.scrollY;
        tracks.forEach((track) => {
          const anim = rateOf(track);
          if (!anim) return;
          if (visible) anim.play();
          else anim.pause();
        });
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(rootEl);

    const tick = () => {
      if (visible) {
        const lenis = getLenis();
        const y = window.scrollY;
        const velocity = lenis ? Math.abs(lenis.velocity) : Math.abs(y - lastY);
        lastY = y;
        const target = 1 + Math.min(velocity * 0.08, 2.6);
        // Ease toward the target so speed changes feel fluid, not stepped
        factor += (target - factor) * 0.07;
        tracks.forEach((track) => {
          const anim = rateOf(track);
          if (anim) anim.playbackRate = factor;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Technologies I work with"
      className="my-16 space-y-4 sm:my-20 sm:space-y-4"
    >
      <Row skills={ROW_ONE} duration="52s" />
      <Row skills={ROW_TWO} duration="64s" reverse />
    </section>
  );
}
