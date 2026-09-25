"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type ScrambleTextProps = {
    text: string;
    duration?: number;
    interval?: number;
};

export default function ScrambleText({
    text,
    duration = 1000,
    interval = 30,
}: ScrambleTextProps) {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        const start = performance.now();

        const timer = setInterval(() => {
            const progress = Math.min(
                (performance.now() - start) / duration,
                1
            );

            const resolved = Math.floor(progress * text.length);

            setDisplay(
                text
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (i < resolved) return char;

                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (progress >= 1) {
                clearInterval(timer);
                setDisplay(text);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [text, duration, interval]);

    return <span className="font-bold">{display}</span>;
}
