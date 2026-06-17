import { materialSummaries } from "@/data/materials";
import Link from "next/link";

export function MaterialText() {
  return (
    <section id="materi" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-newton-red">Materi inti</p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-newton-navy sm:text-4xl">
            Tiga hukum, satu cara melihat gerak
          </h2>
        </div>
        <p className="max-w-2xl text-sm font-medium leading-6 text-newton-navy/72">
          Setiap kartu dihubungkan langsung dengan simulasi di bawahnya. Materi lengkap tersedia di halaman khusus.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {materialSummaries.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-lg border border-newton-navy/10 bg-white/75 p-5 shadow-panel">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-newton-orange">{item.subtitle}</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-normal">{item.title}</h3>
                </div>
                <span className={`grid size-11 shrink-0 place-items-center rounded-lg ${item.accent}`}>
                  <Icon size={22} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-5 text-sm font-medium leading-6 text-newton-navy/76">{item.body}</p>
              <div className="mt-5 rounded-md border border-newton-amber/50 bg-newton-parchment/70 px-4 py-3 text-lg font-bold text-newton-navy">
                {item.formula}
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <Link
          href="/materi"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-newton-navy px-5 text-sm font-bold text-white transition hover:bg-newton-red focus:outline-none focus:ring-2 focus:ring-newton-orange"
        >
          Buka Materi Lengkap
        </Link>
      </div>
    </section>
  );
}
