"use client"
import React, { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const secondAngle = seconds * 6;
    const minuteAngle = (minutes + seconds / 60) * 6;
    const hourAngle = (hours * 30) + (minutes * 0.5);

    return (
        <div className="">
            <svg width="28" height="28" viewBox="0 0 32 32">
                <circle
                    cx="16"
                    cy="16"
                    r="15"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1"
                    className='text-neutral-500'
                />
                <line
                    x1="16"
                    y1="16"
                    x2="16"
                    y2="9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${hourAngle} 16 16)`}
                    className='text-neutral-500'
                />
                <line
                    x1="16"
                    y1="16"
                    x2="16"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${minuteAngle} 16 16)`}
                    className='text-neutral-500'
                />
                <line
                    x1="16"
                    y1="16"
                    x2="16"
                    y2="5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${secondAngle} 16 16)`}
                    className='text-blue-500 transition-transform duration-1000 ease-linear'
                />
                <circle cx="16" cy="16" r="1" fill="currentColor" className='text-blue-500' />
            </svg>
        </div>
    );
}

export default Clock;
