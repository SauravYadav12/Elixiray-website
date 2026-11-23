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

const BEAMS = [
  { d: "M10.5 15 30 5.5v5Z", color: "#f97316" }, // formulate
  { d: "M11 16 32 13.5v5Z", color: "#e1306c" }, // build
  { d: "M10.5 17 30 21.5v5Z", color: "#7c3aed" }, // sell
];

/**
 * Mark: a single spark refracting into three beams — one idea, carried through
 * formulation, build and sales. Read together the beams also suggest an "E".
 * Brand colours are fixed so the logo looks the same in both themes.
 */
export function Logo({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 34 32" className="h-8 w-[2.125rem]" aria-hidden>
        <defs>
          <radialGradient id={id} cx="0.35" cy="0.35" r="0.75">
            <stop offset="0" stopColor="#fdba74" />
            <stop offset="1" stopColor="#f97316" />
          </radialGradient>
        </defs>
        <circle cx="5.5" cy="16" r="4" fill={`url(#${id})`} />
        {BEAMS.map((b) => (
          <path key={b.color} d={b.d} fill={b.color} stroke={b.color} strokeWidth="1.4" strokeLinejoin="round" />
        ))}
      </svg>
      <span className="text-[1.2rem] font-bold tracking-[-0.02em]">Elixiray</span>
    </span>
  );
}

/** Lucide no longer ships brand marks, so the LinkedIn glyph lives here. */
export function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
