"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { EASE, Eyebrow, Logo, Magnetic, Reveal, SplitWords } from "../primitives";

const FAQS = [
  {
    q: "We only have an idea. Is that too early?",
    a: "That's our favourite starting point. The Idea Lab exists to turn a raw concept into a validated thesis — or to tell you, cheaply and early, that it needs to change.",
  },
  {
    q: "Can we engage you for just sales, or just the build?",
    a: "Yes. Each practice runs standalone. Clients often start with one and expand once they see the team work — the people stay the same either way.",
  },
  {
    q: "How do you price engagements?",
    a: "Fixed-fee sprints for formulation, monthly pods for implementation, and a retainer plus performance component for sales. You'll get a written scope before anything starts.",
  },
  {
    q: "Who owns the IP and the code?",
    a: "You do — fully, from day one. We hand over repositories, design files, playbooks and CRM data at every milestone.",
  },
  {
    q: "Which industries do you work in?",
    a: "B2B software, AI, fintech, healthtech and industrial tech — anywhere a technical product needs a sharp story and a disciplined sales motion.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-12 px-4 py-28 sm:px-6 sm:py-40 md:grid-cols-[1fr_1.4fr]">
      <div>
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
        </Reveal>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-5xl">
          <SplitWords inView text="Good questions," />
          <SplitWords inView delay={0.12} text="straight answers." wordClassName="text-mute" />
        </h2>
      </div>
      <div className="divide-y divide-fg/[0.08] border-y border-fg/[0.08]">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors hover:text-gold"
              >
                {f.q}
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="shrink-0">
                  <Plus className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-6 leading-relaxed text-paper/60">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const STAGES = ["Just an idea", "Validated concept", "Building / MVP", "Ready to sell"];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [stage, setStage] = useState(STAGES[0]);

  // No backend yet — wire this to your CRM, email service or a server action.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-fg/10 bg-fg/[0.03] px-4 py-3.5 text-paper placeholder:text-mute/70 outline-none transition focus:border-gold/60 focus:bg-fg/[0.05] focus:ring-4 focus:ring-gold/10";

  return (
    <section id="contact" className="relative overflow-hidden px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-fg/10 bg-ink-2">
        <div aria-hidden className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-ember/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-iris/20 blur-3xl" />
        <div className="relative grid gap-12 p-6 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <Eyebrow>Let&apos;s talk</Eyebrow>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-5xl">
                <SplitWords inView text="Bring the idea." />
                <br />
                <SplitWords inView delay={0.15} text="We'll bring the rest." wordClassName="text-ray" />
              </h2>
              <p className="mt-6 max-w-md text-paper/60">
                A 30-minute strategy call with a partner — not a sales rep. You&apos;ll leave with a sharper view of the
                opportunity, whether or not we work together.
              </p>
            </div>
            <div className="space-y-3 text-sm text-paper/70">
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" /> hello@elixiray.com
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" /> Remote-first · working with teams worldwide
              </p>
            </div>
          </div>

          <div className="relative min-h-[480px]">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex h-full flex-col items-center justify-center rounded-2xl border border-fg/10 bg-ink/50 p-10 text-center"
                >
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }}>
                    <CheckCircle2 className="h-14 w-14 text-mint" />
                  </motion.span>
                  <h3 className="mt-6 text-2xl font-semibold">Request received.</h3>
                  <p className="mt-2 max-w-xs text-paper/60">A partner will reply within one business day to schedule your call.</p>
                  <button onClick={() => setSent(false)} className="mt-8 text-sm text-gold underline-offset-4 hover:underline">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 rounded-2xl border border-fg/10 bg-ink/50 p-6 backdrop-blur sm:p-8"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-paper/70">Name</span>
                      <input required name="name" autoComplete="name" placeholder="Jane Doe" className={field} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-paper/70">Work email</span>
                      <input required type="email" name="email" autoComplete="email" placeholder="jane@company.com" className={field} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-sm text-paper/70">Company</span>
                    <input name="company" autoComplete="organization" placeholder="Company name" className={field} />
                  </label>
                  <fieldset>
                    <legend className="mb-2 text-sm text-paper/70">Where are you today?</legend>
                    <div className="flex flex-wrap gap-2">
                      {STAGES.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setStage(s)}
                          aria-pressed={stage === s}
                          className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                            stage === s ? "border-transparent text-ink" : "border-fg/10 text-paper/70 hover:border-fg/25"
                          }`}
                        >
                          {stage === s && (
                            <motion.span layoutId="stage-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                          )}
                          <span className="relative">{s}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <label className="block">
                    <span className="mb-2 block text-sm text-paper/70">Tell us about the idea</span>
                    <textarea name="message" rows={4} placeholder="What are you building, and who is it for?" className={`${field} resize-none`} />
                  </label>
                  <Magnetic strength={0.15}>
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-7 py-4 font-medium text-ink transition-transform hover:scale-[1.01] sm:w-auto"
                    >
                      Request strategy call
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-fg/[0.06]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Tech sales consulting. We formulate, build and sell new technology — with one accountable team.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm font-medium text-mute">Practice</p>
              <a href="#services" className="block text-paper/70 hover:text-paper">Idea Lab</a>
              <a href="#services" className="block text-paper/70 hover:text-paper">Build Studio</a>
              <a href="#services" className="block text-paper/70 hover:text-paper">Revenue Engine</a>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-mute">Company</p>
              <a href="#method" className="block text-paper/70 hover:text-paper">Method</a>
              <a href="#work" className="block text-paper/70 hover:text-paper">Work</a>
              <a href="#contact" className="block text-paper/70 hover:text-paper">Contact</a>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-mute">Design</p>
              <Link href="/samples" className="block text-paper/70 hover:text-paper">Landing samples</Link>
            </div>
          </div>
        </div>
        <p
          aria-hidden
          className="mt-16 select-none text-center font-semibold leading-none tracking-[-0.03em] text-fg/[0.04] text-[clamp(4rem,20vw,16rem)]"
        >
          Elixiray
        </p>
        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-mute sm:flex-row">
          <p>© 2026 Elixiray. All rights reserved.</p>
          <p>Ideas, distilled. Products, sold.</p>
        </div>
      </div>
    </footer>
  );
}
