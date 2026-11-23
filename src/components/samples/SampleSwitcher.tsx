"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EASE } from "../primitives";
import Editorial from "./Editorial";
import Prism from "./Prism";
import Signal from "./Signal";

const SAMPLES = [
  { id: "editorial", label: "B · Editorial", note: "Warm, premium, magazine-like", C: Editorial },
  { id: "signal", label: "C · Signal", note: "Kinetic, technical, bold", C: Signal },
  { id: "prism", label: "D · Prism", note: "Light, glassy, product-led", C: Prism },
];

export default function SampleSwitcher() {
  const [active, setActive] = useState(SAMPLES[0].id);
  const sample = SAMPLES.find((s) => s.id === active)!;

  return (
    <MotionConfig reducedMotion="user">
      <div className="sticky top-0 z-50 flex h-16 items-center gap-3 overflow-x-auto border-b border-white/10 bg-ink/90 px-4 backdrop-blur-xl">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-paper/70 hover:bg-white/5 hover:text-paper">
          <ArrowLeft className="h-4 w-4" /> A · Aurora (live site)
        </Link>
        <span className="h-5 w-px shrink-0 bg-white/10" />
        {SAMPLES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${active === s.id ? "text-ink" : "text-paper/70 hover:text-paper"}`}
          >
            {active === s.id && (
              <motion.span layoutId="sample-tab" className="absolute inset-0 rounded-full bg-paper" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <span className="relative">{s.label}</span>
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 text-xs text-mute lg:block">{sample.note}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sample.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <sample.C />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
