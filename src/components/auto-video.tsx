"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type AutoVideoProps = VideoHTMLAttributes<HTMLVideoElement>;

export default function AutoVideo(props: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return <video ref={ref} {...props} />;
}
