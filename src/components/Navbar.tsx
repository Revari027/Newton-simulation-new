"use client";

import { Atom, Beaker, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/materi", label: "Materi", icon: BookOpen },
  { href: "/#simulasi", label: "Simulasi", icon: Beaker },
  { href: "/#quiz", label: "Quiz", icon: GraduationCap }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-newton-navy/10 bg-newton-parchment/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-newton-orange">
          <span className="grid size-10 place-items-center rounded-lg bg-newton-navy text-newton-amber">
            <Atom size={22} strokeWidth={2.4} />
          </span>
          <span className="text-lg font-bold tracking-normal text-newton-navy">Newton Lab</span>
        </Link>
        <div className="flex items-center gap-1 rounded-lg bg-white/55 p-1 shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-newton-navy transition hover:bg-newton-amber/45 focus:outline-none focus:ring-2 focus:ring-newton-orange"
              >
                <Icon size={18} aria-hidden="true" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
