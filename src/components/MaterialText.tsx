import { materialSummaries } from "@/data/materials";
import Link from "next/link";

export function MaterialText() {
  return (
    <section id="materi" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        {/* Kiri: intro sticky */}
        <div className="animate-fade-up lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-deep dark:text-sage-soft">
            Materi inti
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-moss-deep dark:text-cream sm:text-5xl">
            Tiga hukum, satu cara melihat gerak.
          </h2>
          <p className="mt-5 max-w-md text-sm font-medium leading-6 text-moss-deep dark:text-moss-soft sm:text-base">
            Setiap kartu dihubungkan langsung dengan simulasi di bawahnya. Materi lengkap tersedia di halaman khusus.
          </p>
          <div className="mt-7 hidden lg:block">
            <Link
              href="/materi"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-moss to-moss-deep px-6 text-sm font-bold text-cream shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:from-sage dark:to-moss dark:text-ink dark:shadow-float-dark dark:hover:shadow-lift-dark"
            >
              Buka Materi Lengkap
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Kanan: 3 kartu vertikal */}
        <div className="grid gap-5">
          {materialSummaries.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                style={{ animationDelay: `${0.1 * index + 0.1}s` }}
                className="card-soft group animate-fade-up relative overflow-hidden rounded-4xl border border-beige/60 bg-cream/80 p-6 shadow-soft backdrop-blur-sm dark:border-moss/30 dark:bg-ink-soft/50 dark:shadow-soft-dark sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full ${item.chip} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40 dark:opacity-25`}
                />
                <div className="relative flex items-start gap-5">
                  <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${item.accent} shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 dark:shadow-soft-dark`}>
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-bold tracking-tight text-moss-deep dark:text-cream">
                        {item.title}
                      </h3>
                      <span className={`rounded-full ${item.chip} px-2.5 py-0.5 text-xs font-bold`}>
                        {item.subtitle}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-6 text-moss-deep dark:text-moss-soft">
                      {item.body}
                    </p>
                    <div className="mt-4 inline-block rounded-xl bg-beige/60 px-4 py-2 text-base font-bold text-ink-deep dark:bg-ink-muted/70 dark:text-cream">
                      {item.formula}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* CTA mobile */}
          <div className="mt-2 flex justify-center lg:hidden">
            <Link
              href="/materi"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-moss to-moss-deep px-6 text-sm font-bold text-cream shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:from-sage dark:to-moss dark:text-ink dark:shadow-float-dark dark:hover:shadow-lift-dark"
            >
              Buka Materi Lengkap
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
