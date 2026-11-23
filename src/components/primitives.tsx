"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useId, useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Splits a line into words that slide up from a clipped baseline. */
export function SplitWords({
  text,
  delay = 0,
  className,
  wordClassName,
  inView = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  wordClassName?: string;
  inView?: boolean;
}) {
  const trigger = inView
    ? { whileInView: { y: "0%" }, viewport: { once: true } }
    : { animate: { y: "0%" } };
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%" }}
            {...trigger}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.06 }}
          >
            {word}
          </motion.span>
          {" "}
        </span>
      ))}
    </span>
  );
}

/** Pulls its child slightly toward the cursor — used on primary CTAs. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-mute">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

/**
 * Mark: a white drop (the elixir) with a spark (the ray) on a warm-to-violet tile.
 * Brand colours are fixed so the logo looks the same in both themes.
 */
export function Logo({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f97316" />
            <stop offset="0.55" stopColor="#e1306c" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
        <path d="M15 7.5C15 7.5 9 14 9 18.5a6 6 0 0 0 12 0C21 14 15 7.5 15 7.5Z" fill="#fff" />
        <path d="M12.6 18.8a2.6 2.6 0 0 0 2.2 2.4" fill="none" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M23 5.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" fill="#fff" />
      </svg>
      <span className="text-[1.15rem] font-bold tracking-[-0.01em]">Elixiray</span>
    </span>
  );
}
