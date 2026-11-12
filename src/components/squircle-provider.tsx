"use client";

import { initSquircle } from "@usespaceui/squircle";
import type { ReactNode } from "react";

if (typeof window !== "undefined") {
  initSquircle();
}

export function SquircleProvider({ children }: { children: ReactNode }) {
  return children;
}
