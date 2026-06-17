import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { detailedMaterials } from "@/data/materials";

export const metadata = {
  title: "Materi Lengkap | Newton Lab",
  description: "Materi lengkap Hukum Newton, gaya, massa, percepatan, dan contoh penerapan."
};

export default function MateriPage() {
  return (
    <main id="top" className="min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <Link
          href="/"
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-newton-navy/12 bg-white/70 px-3 text-sm font-bold text-newton-navy transition hover:border-newton-orange hover:bg-newton-amber/35 focus:outline-none focus:ring-2 focus:ring-newton-orange"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Kembali
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-newton-red">Materi lengkap</p>
            <h1 className="mt-3 text-4xl font-bold tracking-normal text-newton-navy sm:text-6xl">
              Dasar dinamika gerak
            </h1>
          </div>
          <p className="text-base font-medium leading-7 text-newton-navy/74">
            Halaman ini memperluas materi dari SDD: Hukum Newton I, II, III, resultan gaya, berat, gaya normal, dan gaya gesek. Setiap topik dilengkapi inti konsep, poin penting, dan contoh sehari-hari.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 sm:px-6 lg:px-8">
        {detailedMaterials.map((item, index) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="rounded-lg border border-newton-navy/10 bg-white/80 p-5 shadow-panel sm:p-6"
            >
              <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`grid size-12 place-items-center rounded-lg ${item.color}`}>
                      <Icon size={23} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-newton-orange">Topik {index + 1}</p>
                      <h2 className="text-2xl font-bold tracking-normal text-newton-navy">{item.title}</h2>
                    </div>
                  </div>
                  <div className="mt-5 rounded-md border border-newton-amber/60 bg-newton-parchment/75 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-newton-navy/62">Rumus / konsep</p>
                    <p className="mt-1 text-xl font-bold text-newton-navy">{item.formula}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-newton-red">{item.kicker}</p>
                  <p className="mt-3 text-base font-medium leading-7 text-newton-navy/78">{item.explanation}</p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-newton-navy/10 bg-newton-parchment/45 p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-newton-navy">
                        <BookOpen size={18} aria-hidden="true" />
                        Poin penting
                      </div>
                      <ul className="mt-3 space-y-3">
                        {item.keyPoints.map((point) => (
                          <li key={point} className="flex gap-2 text-sm font-medium leading-6 text-newton-navy/76">
                            <CheckCircle2 className="mt-1 size-4 shrink-0 text-newton-orange" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-newton-navy/10 bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-newton-navy">
                        <CheckCircle2 size={18} aria-hidden="true" />
                        Contoh penerapan
                      </div>
                      <ul className="mt-3 space-y-3">
                        {item.examples.map((example) => (
                          <li key={example} className="text-sm font-medium leading-6 text-newton-navy/76">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
