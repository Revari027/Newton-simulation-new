import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden px-4 pb-10 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl border border-beige/60 bg-gradient-to-br from-sage-soft via-cream to-beige-soft p-8 shadow-soft dark:border-moss/30 dark:from-ink-muted/50 dark:via-ink-soft/40 dark:to-ink-deep/50 dark:shadow-soft-dark sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-sage/40 blur-3xl dark:bg-sage/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-beige/50 blur-3xl dark:bg-moss/20" />

        <div className="relative grid gap-8 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-moss to-moss-deep text-cream shadow-soft dark:from-sage dark:to-moss dark:text-ink dark:shadow-soft-dark">
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
            </div>
            <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-moss-deep dark:text-moss-soft">
              Web edukasi fisika berbasis simulasi interaktif untuk memahami tiga Hukum Newton secara visual dan praktis.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss-deep/80 dark:text-moss-soft/80">
              Navigasi
            </p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-moss-deep dark:text-moss-soft">
              <li><Link href="/" className="transition hover:text-sage-deep dark:hover:text-sage-soft">Beranda</Link></li>
              <li><Link href="/materi" className="transition hover:text-sage-deep dark:hover:text-sage-soft">Materi Lengkap</Link></li>
              <li><Link href="/#simulasi" className="transition hover:text-sage-deep dark:hover:text-sage-soft">Simulasi</Link></li>
              <li><Link href="/#quiz" className="transition hover:text-sage-deep dark:hover:text-sage-soft">Mini Quiz</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss-deep/80 dark:text-moss-soft/80">
              Teknologi
            </p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-moss-deep dark:text-moss-soft">
              <li>Next.js 15</li>
              <li>React 19</li>
              <li>Tailwind CSS</li>
              <li>Matter.js</li>
            </ul>
          </div>
        </div>

        <div className="relative mt-8 border-t border-moss/15 dark:border-moss/25 pt-5">
          <p className="text-xs font-medium text-moss-deep/80 dark:text-moss-soft/80">
            Newton Lab &copy; {new Date().getFullYear()}. Dibuat untuk pembelajaran fisika.
          </p>
        </div>
      </div>
    </footer>
  );
}
