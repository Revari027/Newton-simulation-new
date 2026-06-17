import { Activity, Gauge, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { MaterialText } from "@/components/MaterialText";
import { MiniQuiz } from "@/components/MiniQuiz";
import { Navbar } from "@/components/Navbar";
import { PhysicsCanvas } from "@/components/PhysicsCanvas";

const stats = [
  { label: "Materi", value: "6 topik", icon: Activity },
  { label: "Simulasi", value: "Matter.js", icon: Gauge },
  { label: "Akses", value: "Responsif", icon: ShieldCheck }
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:pt-14">
        <div className="flex min-h-[360px] flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-newton-red">Web edukasi fisika</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-normal text-newton-navy sm:text-6xl lg:text-7xl">
            Newton Lab
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-newton-navy/74">
            Platform pembelajaran Hukum Newton dengan materi ringkas, eksperimen digital berbasis Matter.js, dan mini quiz untuk evaluasi mandiri.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#simulasi"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-newton-navy px-5 text-sm font-bold text-white transition hover:bg-newton-red focus:outline-none focus:ring-2 focus:ring-newton-orange"
            >
              Buka Simulasi
            </Link>
            <Link
              href="/materi"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-newton-navy/16 bg-white/60 px-5 text-sm font-bold text-newton-navy transition hover:border-newton-orange hover:bg-newton-amber/40 focus:outline-none focus:ring-2 focus:ring-newton-orange"
            >
              Materi Lengkap
            </Link>
          </div>
        </div>

        <div className="grid content-end gap-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-lg border border-newton-navy/10 bg-white/75 p-4 shadow-panel">
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-lg bg-newton-amber text-newton-navy">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-newton-navy/64">{item.label}</p>
                    <p className="text-xl font-bold text-newton-navy">{item.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <MaterialText />
      <PhysicsCanvas />
      <MiniQuiz />
    </main>
  );
}
