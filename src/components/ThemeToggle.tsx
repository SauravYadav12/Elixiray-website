"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Flips <html data-theme> and remembers the choice. Icons are swapped with the
 * `light:` CSS variant rather than React state, so the server render is always correct.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={`grid h-9 w-9 place-items-center rounded-full border border-fg/10 text-paper/80 transition-colors hover:bg-fg/5 hover:text-paper ${className}`}
    >
      <Sun className="h-4 w-4 light:hidden" />
      <Moon className="hidden h-4 w-4 light:block" />
    </button>
  );
}
