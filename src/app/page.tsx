import { Activity, ArrowRight, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { MaterialText } from "@/components/MaterialText";
import { MiniQuiz } from "@/components/MiniQuiz";
import { Navbar } from "@/components/Navbar";
import { PhysicsCanvas } from "@/components/PhysicsCanvas";

const stats = [
  { label: "Materi", value: "6 topik", icon: Activity, tone: "from-sage-soft to-sage dark:from-moss-deep dark:to-ink", delay: "0.2s" },
  { label: "Simulasi", value: "Matter.js", icon: Gauge, tone: "from-beige to-beige-deep dark:from-ink-muted dark:to-ink-deep", delay: "0.32s" },
  { label: "Akses", value: "Responsif", icon: ShieldCheck, tone: "from-sage to-sage-deep dark:from-moss dark:to-moss-deep", delay: "0.44s" }
];

const lawChips = [
  { label: "Newton I", tone: "bg-sage-soft text-ink-deep border-sage/50 dark:bg-moss/30 dark:text-cream dark:border-sage/40" },
  { label: "Newton II", tone: "bg-beige-soft text-ink-deep border-beige/60 dark:bg-beige-deep/30 dark:text-cream dark:border-beige/40" },
  { label: "Newton III", tone: "bg-moss-soft text-ink-deep border-moss/50 dark:bg-ink-soft dark:text-cream dark:border-moss/40" }
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <Navbar />

      {/* HERO: split asimetris */}
      <section className="relative overflow-hidden px-4 pt-12 sm:px-6 lg:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 size-72 rounded-full bg-sage/30 blur-3xl animate-float dark:bg-moss/20" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-40 size-80 rounded-full bg-beige/40 blur-3xl animate-float-slow dark:bg-sage/12" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Kiri: headline + CTA */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-cream/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-moss-deep shadow-soft dark:border-sage/30 dark:bg-ink-soft/70 dark:text-sage-soft">
              <Sparkles size={13} className="text-sage-deep dark:text-sage-soft" /> Web edukasi fisika
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[0.98] tracking-tight text-moss-deep dark:text-cream sm:text-6xl lg:text-7xl">
              Belajar <span className="text-gradient">Hukum Newton</span> jadi terasa hidup.
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-moss-deep dark:text-moss-soft sm:text-lg">
              Materi ringkas, simulasi interaktif berbasis Matter.js, dan mini quiz untuk evaluasi mandiri, semua dalam satu tempat yang estetik.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#simulasi"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-moss to-moss-deep px-7 text-sm font-bold text-cream shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:from-sage dark:to-moss dark:text-ink dark:shadow-float-dark dark:hover:shadow-lift-dark"
              >
                Buka Simulasi
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            <Link
              href="/materi"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-moss/20 bg-beige/50 px-7 text-sm font-bold text-ink-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-sage hover:bg-beige focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:border-moss/30 dark:bg-ink-soft/60 dark:text-cream dark:hover:border-sage dark:hover:bg-ink-muted"
            >
              Materi Lengkap
            </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              {lawChips.map((chip) => (
                <span
                  key={chip.label}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${chip.tone}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* Kanan: feature card vertikal dengan atom + stats */}
          <div
            className="animate-fade-up rounded-4xl border border-beige/60 bg-cream/70 p-6 shadow-float backdrop-blur-sm dark:border-moss/30 dark:bg-ink-soft/50 dark:shadow-float-dark"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex items-center justify-center">
              <div className="relative grid size-28 place-items-center rounded-full bg-gradient-to-br from-sage-soft to-beige-soft dark:from-moss/40 dark:to-ink-muted/60">
                <div className="absolute inset-0 animate-spin-slow">
                  <svg width="112" height="112" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-ink-deep/70 dark:text-sage/70">
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="0.6" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="0.6" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="0.6" transform="rotate(120 12 12)" />
                  </svg>
                </div>
                <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-moss to-moss-deep text-cream shadow-soft dark:from-sage dark:to-moss dark:text-ink dark:shadow-soft-dark">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8" transform="rotate(120 12 12)" />
                    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    style={{ animationDelay: item.delay }}
                    className="flex animate-fade-up items-center gap-3 rounded-2xl border border-beige/60 bg-cream/60 p-3 dark:border-moss/25 dark:bg-ink-muted/40"
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.tone} text-ink-deep shadow-soft dark:text-cream dark:shadow-soft-dark`}>
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss-deep/80 dark:text-moss-soft/80">
                        {item.label}
                      </p>
                      <p className="text-lg font-bold tracking-tight text-moss-deep dark:text-cream">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <MaterialText />
      <PhysicsCanvas />
      <MiniQuiz />
      <Footer />
    </main>
  );
}
