import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { detailedMaterials } from "@/data/materials";

export const metadata = {
  title: "Materi Lengkap",
  description:
    "Materi lengkap Hukum Newton, gaya, massa, percepatan, dan contoh penerapan."
};

export default function MateriPage() {
  return (
    <main id="top" className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden px-4 pt-10 sm:px-6 lg:pt-14">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-sage/25 blur-3xl animate-float dark:bg-moss/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-32 size-80 rounded-full bg-beige/35 blur-3xl animate-float-slow dark:bg-sage/10" />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/"
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-moss/20 bg-beige/50 px-4 text-sm font-bold text-ink-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-sage hover:bg-beige focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:border-moss/30 dark:bg-ink-soft/60 dark:text-cream dark:hover:border-sage dark:hover:bg-ink-muted"
          >
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            Kembali
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.2em] text-sage-deep dark:text-sage-soft">
              Materi lengkap
            </p>
            <h1
              className="mt-3 animate-fade-up text-5xl font-bold leading-[0.95] tracking-tight text-moss-deep dark:text-cream sm:text-6xl"
              style={{ animationDelay: "0.08s" }}
            >
              Dasar <span className="text-gradient">dinamika gerak</span>.
            </h1>
            <p
              className="mt-5 animate-fade-up max-w-2xl text-base font-medium leading-7 text-moss-deep dark:text-moss-soft"
              style={{ animationDelay: "0.16s" }}
            >
              Halaman ini memperluas materi dari SDD: Hukum Newton I, II, III, resultan gaya, berat, gaya normal, dan gaya gesek. Setiap topik dilengkapi inti konsep, poin penting, dan contoh sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* grid 2 kolom */}
      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-16 sm:px-6 md:grid-cols-2">
        {detailedMaterials.map((item, index) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              style={{ animationDelay: `${0.05 * index}s` }}
              className="card-soft group animate-fade-up overflow-hidden rounded-4xl border border-beige/60 bg-cream/80 p-6 shadow-soft backdrop-blur-sm dark:border-moss/30 dark:bg-ink-soft/50 dark:shadow-soft-dark sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${item.color} shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 dark:shadow-soft-dark`}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-moss-deep/80 dark:text-moss-soft/80">Topik {index + 1}</p>
                  <h2 className="truncate text-2xl font-bold tracking-tight text-moss-deep dark:text-cream">{item.title}</h2>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-beige/60 px-4 py-3 dark:bg-ink-muted/70">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-moss-deep/80 dark:text-moss-soft/80">
                  Rumus / konsep
                </p>
                <p className="mt-1 text-lg font-bold text-ink-deep dark:text-cream">{item.formula}</p>
              </div>

              <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-sage-deep dark:text-sage-soft">
                {item.kicker}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-moss-deep dark:text-moss-soft">
                {item.explanation}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-beige/60 bg-beige/40 p-4 transition-colors duration-300 group-hover:bg-beige/60 dark:border-moss/25 dark:bg-ink-muted/40 dark:group-hover:bg-ink-muted/60">
                  <div className="flex items-center gap-2 text-sm font-bold text-moss-deep dark:text-cream">
                    <BookOpen size={16} aria-hidden="true" className="text-sage-deep dark:text-sage-soft" />
                    Poin penting
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {item.keyPoints.map((point) => (
                      <li key={point} className="flex gap-2 text-xs font-medium leading-5 text-moss-deep dark:text-moss-soft">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-sage-deep dark:text-sage-soft" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-beige/60 bg-cream/70 p-4 shadow-soft dark:border-moss/25 dark:bg-ink-muted/30 dark:shadow-soft-dark">
                  <div className="flex items-center gap-2 text-sm font-bold text-moss-deep dark:text-cream">
                    <CheckCircle2 size={16} aria-hidden="true" className="text-moss-deep dark:text-moss-soft" />
                    Contoh penerapan
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {item.examples.map((example) => (
                      <li key={example} className="text-xs font-medium leading-5 text-moss-deep dark:text-moss-soft">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}
