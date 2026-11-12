"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getLenis, setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  for (const token of text.split(/(\s+)/)) {
    if (!token) continue;
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(" "));
      continue;
    }
    const word = document.createElement("span");
    word.className = "split-word";
    for (const ch of token) {
      const char = document.createElement("span");
      char.className = "split-char";
      char.textContent = ch;
      word.appendChild(char);
    }
    el.appendChild(word);
  }
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Smooth scroll engine — created once, lives for the whole app
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Route anchor links through Lenis
    const onAnchorClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const anchor = e.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Route change: snap to top and recalculate triggers
  useLayoutEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  // Scroll-linked motion — re-created for every route
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // --- Entrance reveals, staggered as each section scrolls in ---
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (reveals.length) {
        gsap.set(reveals, { y: 32, opacity: 0 });
        ScrollTrigger.batch(reveals, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
      }

      // --- Hero entrance ---
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero]");
      if (heroItems.length) {
        gsap.set(heroItems, { y: 28, opacity: 0 });
        gsap.to(heroItems, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.15,
        });
      }

      // --- Masked char reveal (hero title, email) ---
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        if (!el.querySelector(".split-char")) splitChars(el);
        const chars = el.querySelectorAll(".split-char");
        if (!chars.length) return;
        gsap.set(chars, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(chars, {
              yPercent: 0,
              duration: 1.2,
              ease: "power4.out",
              stagger: 0.028,
              delay: el.dataset.splitDelay ? Number(el.dataset.splitDelay) : 0,
            }),
        });
      });

      // --- Media gently scales as it scrolls into view ---
      gsap.utils.toArray<HTMLElement>("[data-scrub-scale]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.94 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 40%",
              scrub: 1.2,
            },
          },
        );
      });

      if (!canHover()) return;

      // --- Magnetic buttons ---
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3.out" });
        const sTo = gsap.quickTo(btn, "scale", { duration: 0.35, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          xTo(gsap.utils.clamp(-10, 10, dx * 0.28));
          yTo(gsap.utils.clamp(-10, 10, dy * 0.28));
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
          sTo(1);
        };
        const onDown = () => sTo(0.94);
        const onUp = () => sTo(1);

        btn.addEventListener("pointermove", onMove);
        btn.addEventListener("pointerleave", onLeave);
        btn.addEventListener("pointerdown", onDown);
        btn.addEventListener("pointerup", onUp);
        btn.addEventListener("pointercancel", onUp);
      });

      // --- Spin on hover (sunflower) ---
      gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
        let rotation = 0;
        el.addEventListener("pointerenter", () => {
          rotation += 180;
          gsap.to(el, { rotation, duration: 0.8, ease: "power2.out" });
        });
      });
    });

    // Recalculate after the first paint so triggers already past their start fire
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [pathname]);

  return <>{children}</>;
}
