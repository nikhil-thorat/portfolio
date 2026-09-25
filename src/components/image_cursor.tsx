"use client";

import React, { useState, useRef } from "react";

interface HoverImageTextProps {
    text: string;
    imageSrc: string;
    imageWidth?: number;
    imageHeight?: number;
    className?: string;
    downscale?: boolean;
}

export default function HoverImageText({
    text,
    imageSrc,
    imageWidth = 240,
    imageHeight = 160,
    className = "",
    downscale = false,
}: HoverImageTextProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLSpanElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <span
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className={`relative inline-block cursor-pointer font-bold bg-neutral-100 ${className}`}
        >
            {text}

            <span
                className="pointer-events-none absolute left-0 top-0 z-50 transition-all duration-150 ease-out"
                style={{
                    transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`,
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.6,
                }}
            >
                <span
                    className="block overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-white"
                    style={{
                        width: `${imageWidth}px`,
                        height: `${imageHeight}px`,
                    }}
                >
                    <img
                        src={imageSrc}
                        alt={text}
                        className={`h-full w-full object-cover contrast-100 brightness-110 ${downscale ? "scale-70" : ""}`}
                    />
                </span>
            </span>
        </span>
    );
}
