"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? (localStorage.getItem("theme") as Theme | null)
      : null);
    const initial: Theme =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  function toggle() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      title={theme === "dark" ? "Mode terang" : "Mode gelap"}
      className="group relative grid size-9 place-items-center rounded-full border border-beige/60 bg-beige/40 text-ink-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-sage hover:text-ink-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:border-moss/40 dark:bg-ink-soft/60 dark:text-cream dark:hover:border-sage"
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun
            size={16}
            aria-hidden="true"
            className="animate-theme-pop text-sage-deep"
          />
        ) : (
          <Moon
            size={16}
            aria-hidden="true"
            className="animate-theme-pop text-moss-deep"
          />
        )
      ) : (
        <Sun size={16} aria-hidden="true" className="opacity-0" />
      )}
    </button>
  );
}
