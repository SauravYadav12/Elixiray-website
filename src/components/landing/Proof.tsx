"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "../primitives";

// Placeholder client wordmarks — swap for real logos.
const CLIENTS = ["Northwind", "Lumen Labs", "Halcyon AI", "Vertex Health", "Quanta Pay", "Orbital", "Fieldstone", "Kairo Cloud"];

const STATS = [
  { value: 140, suffix: "+", label: "Tech ideas formulated & stress-tested" },
  { value: 62, suffix: "", label: "Products taken from zero to launch" },
  { value: 310, prefix: "$", suffix: "M", label: "Pipeline generated for clients" },
  { value: 11, suffix: " wks", label: "Median time from idea to first sale" },
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  // Writes straight to the DOM so the count doesn't re-render React every frame.
  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const render = (v: number) => {
      el.textContent = `${prefix}${Math.round(v)}${suffix}`;
    };
    if (reduce) {
      render(to);
      return;
    }
    const controls = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: render });
    return () => controls.stop();
  }, [inView, reduce, to, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

export function ClientMarquee() {
  return (
    <section aria-label="Clients" className="relative border-y border-fg/[0.06] py-10">
      <p className="mb-8 text-center text-sm font-medium text-mute">
        Trusted by founders and innovation teams at
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-16 pr-16">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-2xl font-semibold tracking-tight text-paper/30 transition-colors hover:text-paper/80"
            >
              {i % 3 === 1 ? <span className="font-medium">{c}</span> : c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-fg/[0.06] bg-fg/[0.06] lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-ink p-6 sm:p-10">
            <p className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-mute">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
