"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "../primitives";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/";

/** Resolves random glyphs into the target text, left to right. */
function Scramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const [out, setOut] = useState(text.replace(/\S/g, " "));
  useEffect(() => {
    let frame = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        frame++;
        const revealed = Math.floor(frame / 2);
        setOut(
          text
            .split("")
            .map((ch, i) => (ch === " " || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join("")
        );
        if (revealed >= text.length) clearInterval(id);
      }, 30);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, delay]);
  return <span>{out}</span>;
}

const LOG = [
  ["idea.validate()", "23 buyer interviews · signal: strong"],
  ["thesis.price()", "$48k ACV · willingness-to-pay confirmed"],
  ["mvp.ship()", "v0.9 deployed · 2 design partners live"],
  ["gtm.launch()", "ICP: mid-market ops · 3 channels open"],
  ["pipeline.report()", "$4.2M qualified · 7 deals in legal"],
];

const TICKER = ["IDEA → PRODUCT → PIPELINE", "62 LAUNCHES", "$310M PIPELINE GENERATED", "11 WKS TO FIRST SALE", "ONE ACCOUNTABLE TEAM"];

/** Sample C — kinetic, terminal-inspired: black + electric lime, monospaced. */
export default function Signal() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-black font-mono text-[#e9ffe0]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,#d4ff3a_0_1px,transparent_1px_4px)]" />

      <header className="relative flex items-center justify-between px-6 py-5 text-sm sm:px-10">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse bg-[#d4ff3a]" /> ELIXIRAY_
        </span>
        <span className="hidden gap-6 text-[#e9ffe0]/60 sm:flex">
          <span>[services]</span><span>[method]</span><span>[work]</span>
        </span>
        <span className="border border-[#d4ff3a] px-3 py-1.5 text-[#d4ff3a] transition-colors hover:bg-[#d4ff3a] hover:text-black">
          ./book-call
        </span>
      </header>

      <div className="relative grid flex-1 items-center gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4ff3a]">{"// tech sales consulting"}</p>
          <h1 className="mt-6 font-sans text-[clamp(2.8rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
            <span className="block"><Scramble text="Idea in." delay={0.2} /></span>
            <span className="block text-[#d4ff3a]"><Scramble text="Revenue out." delay={0.6} /></span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 max-w-lg text-sm leading-relaxed text-[#e9ffe0]/60"
          >
            &gt; Elixiray formulates new tech ideas, engineers them into products and runs the sales motion that turns
            them into a business. One team. One pipeline. Zero handoffs.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="mt-10 flex flex-wrap gap-3 text-sm">
            <span className="bg-[#d4ff3a] px-6 py-3.5 font-semibold text-black">START_PROJECT →</span>
            <span className="border border-white/20 px-6 py-3.5">VIEW_CASES</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
          className="border border-[#d4ff3a]/30 bg-[#0a0d05]"
        >
          <div className="flex justify-between border-b border-[#d4ff3a]/20 px-4 py-2 text-[11px] text-[#e9ffe0]/50">
            <span>engagement.log</span><span className="text-[#d4ff3a]">● live</span>
          </div>
          <div className="space-y-4 p-5 text-xs sm:text-sm">
            {LOG.map(([cmd, res], i) => (
              <motion.div key={cmd} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.45 }}>
                <p><span className="text-[#d4ff3a]">$</span> {cmd}</p>
                <p className="pl-4 text-[#e9ffe0]/55">↳ {res}</p>
              </motion.div>
            ))}
            <motion.span
              className="inline-block h-4 w-2 bg-[#d4ff3a] align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      <div className="relative overflow-hidden border-t border-[#d4ff3a]/30 bg-[#d4ff3a] py-3 text-sm font-semibold text-black">
        <div className="animate-marquee flex w-max gap-10 pr-10">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="whitespace-nowrap">{t} ✦</span>
          ))}
        </div>
      </div>
    </div>
  );
}
