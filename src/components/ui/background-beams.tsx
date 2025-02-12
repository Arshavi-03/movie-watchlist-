"use client";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const BackgroundBeams = ({
    className,
}: {
    className?: string;
}) => {
    const beams = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!beams.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = Math.round((clientX / window.innerWidth) * 100);
            const y = Math.round((clientY / window.innerHeight) * 100);

            beams.current!.style.setProperty("--x", `${x}%`);
            beams.current!.style.setProperty("--y", `${y}%`);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={beams}
            className={cn(
                "absolute inset-0 overflow-hidden [--x:50%] [--y:50%]",
                className
            )}
        >
            <div className="h-full w-full bg-slate-950">
                {/* Main large beam */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_var(--x)_var(--y),rgba(29,78,216,0.12),transparent_80%)]" />

                {/* Medium intensity beam */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_var(--x)_var(--y),rgba(29,78,216,0.24),transparent_80%)]" />

                {/* High intensity center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_var(--x)_var(--y),rgba(29,78,216,0.4),transparent_80%)]" />

                {/* Additional ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/20 to-slate-950" />

                {/* Vertical light streaks */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,rgba(29,78,216,0.03)_2px,transparent_4px)]" />
            </div>
        </div>
    );
};

export default BackgroundBeams;