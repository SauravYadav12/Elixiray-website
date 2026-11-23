"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import type { MouseEvent } from "react";
import { EASE } from "../primitives";

/** Sample D — light, airy, glassmorphic with a 3D-tilting product card. */
export default function Prism() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div onMouseMove={onMove} className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#f6f5ff] text-[#16133a]">
      {/* drifting gradient mesh */}
      {[
        { c: "#b8a9ff", x: ["-10%", "10%"], y: ["0%", "15%"], cls: "left-[-10%] top-[-20%]" },
        { c: "#ffc7a8", x: ["10%", "-5%"], y: ["10%", "-10%"], cls: "right-[-10%] top-[10%]" },
        { c: "#a8f0e0", x: ["0%", "15%"], y: ["-5%", "10%"], cls: "bottom-[-30%] left-[20%]" },
      ].map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`absolute h-[60vh] w-[60vh] rounded-full opacity-70 blur-[90px] ${b.cls}`}
          style={{ background: b.c }}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl font-semibold tracking-tight">elixiray</span>
        <nav className="hidden gap-1 rounded-full border border-white/70 bg-white/50 p-1 text-sm backdrop-blur-xl sm:flex">
          {["Services", "Method", "Work", "Contact"].map((l, i) => (
            <span key={l} className={`rounded-full px-4 py-1.5 ${i === 0 ? "bg-[#16133a] text-white" : "text-[#16133a]/70"}`}>{l}</span>
          ))}
        </nav>
      </header>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-8 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-xs font-medium backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#7b61ff]" /> Idea · Build · Sell
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="mt-6 text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.04em]"
          >
            Where new tech
            <br />
            finds its{" "}
            <span className="bg-gradient-to-r from-[#7b61ff] via-[#e86bb2] to-[#ff8a5c] bg-clip-text text-transparent">market.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-[#16133a]/65"
          >
            We help founders and enterprise teams shape the idea, build the product and close the first customers —
            so innovation shows up on the revenue line.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-9 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#16133a] px-6 py-3.5 font-medium text-white shadow-[0_12px_30px_-10px_#7b61ff]">
              Book a strategy call <ArrowRight className="h-4 w-4" />
            </span>
            <span className="rounded-full border border-[#16133a]/15 bg-white/50 px-6 py-3.5 font-medium backdrop-blur">Our method</span>
          </motion.div>
        </div>

        <div className="[perspective:1400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative rounded-3xl border border-white/80 bg-white/55 p-6 shadow-[0_40px_80px_-30px_rgb(60_40_160/0.35)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#16133a]/60">Engagement dashboard</p>
              <span className="rounded-full bg-[#a8f0e0] px-2.5 py-1 text-xs font-medium">On track</span>
            </div>
            <p className="mt-4 text-5xl font-semibold tracking-tight">$4.2M</p>
            <p className="text-sm text-[#16133a]/55">Qualified pipeline · week 14</p>
            <div className="mt-6 flex h-32 items-end gap-2">
              {[30, 42, 38, 55, 50, 68, 74, 88, 96].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.8 + i * 0.06 }}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-[#7b61ff] to-[#e86bb2]"
                />
              ))}
            </div>

            <motion.div
              style={{ translateZ: 60 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="absolute -left-4 -top-8 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-xl backdrop-blur sm:-left-10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffc7a8]"><TrendingUp className="h-4 w-4" /></span>
              <div className="text-xs"><p className="font-semibold">+212%</p><p className="text-[#16133a]/55">win rate</p></div>
            </motion.div>
            <motion.div
              style={{ translateZ: 80 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-xl backdrop-blur sm:-right-10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#b8a9ff]"><Users className="h-4 w-4" /></span>
              <div className="text-xs"><p className="font-semibold">14 enterprise logos</p><p className="text-[#16133a]/55">signed in 9 months</p></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
