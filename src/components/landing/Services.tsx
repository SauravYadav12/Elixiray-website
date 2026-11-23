"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, FlaskConical, Layers, Target } from "lucide-react";
import type { MouseEvent } from "react";
import { EASE, Eyebrow, Reveal, SplitWords } from "../primitives";

const SERVICES = [
  {
    icon: FlaskConical,
    tag: "Formulation",
    title: "Idea Lab",
    copy: "We pressure-test your concept against real buyers before a line of code is written — so you build the thing the market will pay for.",
    points: ["Market & competitor mapping", "Customer discovery sprints", "Value proposition & pricing", "Investor-ready product thesis"],
    glow: "rgb(255 181 71 / 0.18)",
    accent: "text-gold",
  },
  {
    icon: Layers,
    tag: "Implementation",
    title: "Build Studio",
    copy: "Senior product, design and engineering pods that turn the validated thesis into a shippable MVP — then harden it for scale.",
    points: ["Product strategy & roadmap", "UX/UI design systems", "Full-stack & AI engineering", "Pilot & launch readiness"],
    glow: "rgb(255 122 69 / 0.18)",
    accent: "text-ember",
  },
  {
    icon: Target,
    tag: "Sales",
    title: "Revenue Engine",
    copy: "We design the go-to-market, build the pipeline and sell alongside you until the motion is repeatable — and your team owns it.",
    points: ["ICP & GTM playbooks", "Outbound & partner channels", "Sales enablement & demos", "Fractional sales leadership"],
    glow: "rgb(139 124 255 / 0.2)",
    accent: "text-iris",
  },
];

function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-40">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-5xl">
            <SplitWords inView text="Three disciplines." />
            <SplitWords inView delay={0.2} text="One accountable team." wordClassName="text-mute" />
          </h2>
        </div>
        <Reveal delay={0.2} className="max-w-sm text-paper/60">
          Most firms hand off at the seams — strategy to build, build to sales. We don&apos;t. Engage one practice
          or all three; the team stays the same.
        </Reveal>
      </div>

      <div className="mt-20 grid gap-4 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            onMouseMove={trackSpotlight}
            className="group relative overflow-hidden rounded-3xl border border-fg/[0.08] bg-ink-2 p-8 sm:p-10"
            style={{ ["--glow" as string]: s.glow }}
          >
            {/* cursor-following spotlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), var(--glow), transparent 60%)" }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl border border-fg/10 bg-fg/[0.03] ${s.accent}`}>
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-mute">
                  0{i + 1} · {s.tag}
                </span>
              </div>
              <h3 className="mt-10 text-3xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-paper/60">{s.copy}</p>
              <ul className="mt-8 space-y-3 border-t border-fg/[0.06] pt-6">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-paper/80">
                    <Check className={`h-4 w-4 shrink-0 ${s.accent}`} />
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-paper/80 transition-colors hover:text-paper">
                Start with {s.title}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
