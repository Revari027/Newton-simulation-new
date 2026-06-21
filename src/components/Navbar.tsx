"use client";

import { BookOpen, GraduationCap, Beaker } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/materi", label: "Materi", icon: BookOpen },
  { href: "/#simulasi", label: "Simulasi", icon: Beaker },
  { href: "/#quiz", label: "Quiz", icon: GraduationCap }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-beige/60 glass px-4 py-2.5 shadow-soft dark:border-moss/40 dark:shadow-soft-dark sm:px-5">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-moss to-moss-deep text-cream shadow-soft transition-transform duration-500 group-hover:rotate-[18deg] dark:from-sage dark:to-moss dark:text-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8" />
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8" transform="rotate(120 12 12)" />
              <circle cx="12" cy="12" r="1.6" fill="currentColor" />
            </svg>
          </span>
          <span className="text-base font-bold tracking-tight text-moss-deep dark:text-cream">
            Newton Lab
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-beige/40 p-1 dark:bg-ink-soft/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href.includes("#") && pathname === "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-moss transition hover:text-moss-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:text-moss-soft dark:hover:text-cream"
                >
                  <span className="absolute inset-0 scale-90 rounded-full bg-gradient-to-br from-sage-soft to-beige-soft opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 dark:from-moss/40 dark:to-ink-muted/60" />
                  <Icon
                    size={15}
                    aria-hidden="true"
                    className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <span className="relative hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
