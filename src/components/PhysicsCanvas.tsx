"use client";

import Matter from "matter-js";
import { Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type LawMode = "newton-1" | "newton-2" | "newton-3";

const lawOptions: Array<{ id: LawMode; title: string; label: string }> = [
  { id: "newton-1", title: "Newton I", label: "Inersia" },
  { id: "newton-2", title: "Newton II", label: "F = m x a" },
  { id: "newton-3", title: "Newton III", label: "Aksi reaksi" }
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function drawArrow(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  length: number,
  color: string,
  label: string
) {
  const endX = startX + length;
  const direction = Math.sign(length) || 1;
  context.save();
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = 4;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, startY);
  context.stroke();
  context.beginPath();
  context.moveTo(endX, startY);
  context.lineTo(endX - direction * 11, startY - 8);
  context.lineTo(endX - direction * 11, startY + 8);
  context.closePath();
  context.fill();
  context.font = "700 12px SF Pro Display, system-ui, sans-serif";
  context.fillText(label, Math.min(startX, endX) + Math.abs(length) / 2 - 16, startY - 10);
  context.restore();
}

export function PhysicsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const primaryBodyRef = useRef<Matter.Body | null>(null);
  const secondaryBodyRef = useRef<Matter.Body | null>(null);
  const runningRef = useRef(false);
  const darkRef = useRef(false);

  const [law, setLaw] = useState<LawMode>("newton-2");
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(22);
  const [isRunning, setIsRunning] = useState(false);
  const [sceneVersion, setSceneVersion] = useState(0);

  const acceleration = useMemo(() => Number((force / mass).toFixed(2)), [force, mass]);
  const currentLaw = lawOptions.find((option) => option.id === law) ?? lawOptions[1];

  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  // observe theme changes to restyle canvas overlay colors
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      darkRef.current = root.classList.contains("dark");
      setSceneVersion((v) => v + 1);
    };
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    darkRef.current = root.classList.contains("dark");
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const width = clamp(container.clientWidth || 960, 320, 1180);
    const height = width < 640 ? 340 : 420;
    const dark = darkRef.current;

    const engine = Matter.Engine.create();
    const world = engine.world;
    world.gravity.y = law === "newton-1" ? 0 : 0.25;
    if (law !== "newton-2") world.gravity.y = 0;

    const render = Matter.Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });
    const runner = Matter.Runner.create();

    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;
    runningRef.current = false;
    setIsRunning(false);

    const floorColor = dark ? "#3a443f" : "#778873";
    const wallColor = dark ? "rgba(148,163,144,0.18)" : "rgba(119,136,115,0.25)";
    const floor = Matter.Bodies.rectangle(width / 2, height - 22, width - 24, 24, {
      isStatic: true,
      render: { fillStyle: floorColor }
    });
    const leftWall = Matter.Bodies.rectangle(10, height / 2, 18, height, {
      isStatic: true,
      render: { fillStyle: wallColor }
    });
    const rightWall = Matter.Bodies.rectangle(width - 10, height / 2, 18, height, {
      isStatic: true,
      render: { fillStyle: wallColor }
    });

    const paletteLight: Record<LawMode, string> = {
      "newton-1": "#A1BC98",
      "newton-2": "#DCCFC0",
      "newton-3": "#778873"
    };
    const paletteDark: Record<LawMode, string> = {
      "newton-1": "#A1BC98",
      "newton-2": "#5e6b5b",
      "newton-3": "#94a390"
    };
    const primaryColor = (dark ? paletteDark : paletteLight)[law];
    const primary = Matter.Bodies.rectangle(width * 0.24, height - 76, 78, 52, {
      friction: 0,
      frictionAir: law === "newton-1" ? 0 : 0.018,
      restitution: law === "newton-3" ? 1 : 0.15,
      render: { fillStyle: primaryColor }
    });
    Matter.Body.setMass(primary, mass);
    primaryBodyRef.current = primary;

    const bodies = [floor, leftWall, rightWall, primary];

    if (law === "newton-3") {
      const secondaryColor = dark ? "#A1BC98" : "#A1BC98";
      const secondary = Matter.Bodies.rectangle(width * 0.72, height - 76, 78, 52, {
        friction: 0,
        frictionAir: 0,
        restitution: 1,
        render: { fillStyle: secondaryColor }
      });
      Matter.Body.setMass(secondary, mass);
      secondaryBodyRef.current = secondary;
      bodies.push(secondary);
    } else {
      secondaryBodyRef.current = null;
    }

    Matter.Composite.add(world, bodies);

    const gridColor = dark ? "rgba(148,163,144,0.18)" : "rgba(119,136,115,0.14)";
    const labelColor = dark ? "#c3d6bb" : "#5e6b5b";
    const subColor = dark ? "rgba(195,214,187,0.6)" : "rgba(94,107,91,0.65)";
    const arrowPrimary = dark ? "#A1BC98" : "#8aa680";
    const arrowSecondary = dark ? "#94a390" : "#778873";
    const arrowAction = dark ? "#c3d6bb" : "#5e6b5b";

    Matter.Events.on(render, "afterRender", () => {
      const context = render.context;
      context.save();

      // soft dotted grid
      context.fillStyle = gridColor;
      for (let x = 36; x < width; x += 36) {
        for (let y = 28; y < height - 38; y += 36) {
          context.beginPath();
          context.arc(x, y, 1.4, 0, Math.PI * 2);
          context.fill();
        }
      }

      // HUD label
      context.fillStyle = labelColor;
      context.font = "700 14px SF Pro Display, system-ui, sans-serif";
      context.fillText(currentLaw.title, 22, 30);
      context.font = "500 12px SF Pro Text, system-ui, sans-serif";
      context.fillStyle = subColor;
      context.fillText(`Massa ${mass} kg · Gaya ${force} N · a ${acceleration} m/s²`, 22, 50);

      const primaryPosition = primary.position;
      context.fillStyle = labelColor;
      context.font = "700 12px SF Pro Display, system-ui, sans-serif";
      context.fillText(`${mass} kg`, primaryPosition.x - 15, primaryPosition.y + 4);

      if (runningRef.current && law === "newton-2") {
        drawArrow(context, primaryPosition.x + 48, primaryPosition.y - 6, clamp(force * 3, 36, 150), arrowPrimary, `${force} N`);
      }
      if (runningRef.current && law === "newton-1") {
        drawArrow(context, primaryPosition.x + 48, primaryPosition.y - 6, 92, arrowSecondary, "v konstan");
      }
      if (runningRef.current && law === "newton-3" && secondaryBodyRef.current) {
        const secondaryPosition = secondaryBodyRef.current.position;
        drawArrow(context, primaryPosition.x + 48, primaryPosition.y - 6, 70, arrowAction, "aksi");
        drawArrow(context, secondaryPosition.x - 48, secondaryPosition.y - 6, -70, arrowPrimary, "reaksi");
      }

      context.restore();
    });

    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [acceleration, currentLaw.title, force, law, mass, sceneVersion]);

  function runSimulation() {
    const primary = primaryBodyRef.current;
    if (!primary) return;
    runningRef.current = true;
    setIsRunning(true);
    Matter.Body.setAngularVelocity(primary, 0);
    Matter.Body.setAngle(primary, 0);

    if (law === "newton-1") {
      Matter.Body.setVelocity(primary, { x: 5, y: 0 });
      return;
    }
    if (law === "newton-2") {
      Matter.Body.setVelocity(primary, { x: 0, y: 0 });
      Matter.Body.applyForce(primary, primary.position, { x: force / 900, y: 0 });
      return;
    }
    const secondary = secondaryBodyRef.current;
    if (secondary) {
      Matter.Body.setVelocity(primary, { x: 5.2, y: 0 });
      Matter.Body.setVelocity(secondary, { x: -5.2, y: 0 });
    }
  }

  function resetSimulation() {
    runningRef.current = false;
    setIsRunning(false);
    setSceneVersion((version) => version + 1);
  }

  return (
    <section id="simulasi" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.2em] text-sage-deep dark:text-sage-soft">
            Simulasi interaktif
          </p>
          <h2
            className="mt-3 animate-fade-up max-w-2xl text-4xl font-bold tracking-tight text-moss-deep dark:text-cream sm:text-5xl"
            style={{ animationDelay: "0.08s" }}
          >
            Eksperimen gaya & massa.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* canvas (kiri besar) */}
          <div
            className="animate-fade-up order-2 overflow-hidden rounded-4xl border border-beige/60 bg-gradient-to-br from-sage-soft via-cream to-beige-soft p-3 shadow-float dark:border-moss/30 dark:from-ink-muted/60 dark:via-ink-soft/40 dark:to-ink-deep/60 dark:shadow-float-dark lg:order-1"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-cream-deep shadow-soft ring-1 ring-moss/10 dark:bg-ink-deep dark:shadow-soft-dark dark:ring-moss/15">
              <div ref={containerRef} className="min-h-[340px] w-full overflow-hidden" />
            </div>
          </div>

          {/* control panel (kanan) */}
          <aside className="animate-fade-up order-1 rounded-4xl border border-beige/60 bg-cream/80 p-6 shadow-soft backdrop-blur-sm dark:border-moss/30 dark:bg-ink-soft/50 dark:shadow-soft-dark lg:order-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-deep dark:text-sage-soft">
              <Sparkles size={13} className="text-sage-deep dark:text-sage-soft" /> Kontrol
            </p>

            <div className="mt-5 grid gap-2">
              {lawOptions.map((option) => {
                const active = law === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setLaw(option.id)}
                    className={[
                      "group relative flex min-h-11 items-center justify-between overflow-hidden rounded-2xl px-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage",
                      active
                        ? "bg-gradient-to-br from-moss to-moss-deep text-cream shadow-float dark:from-sage dark:to-moss dark:text-ink dark:shadow-float-dark"
                        : "bg-beige/50 text-moss hover:bg-beige hover:text-moss-deep hover:-translate-y-0.5 dark:bg-ink-muted/50 dark:text-moss-soft dark:hover:bg-ink-muted dark:hover:text-cream"
                    ].join(" ")}
                  >
                    <span className="text-sm font-bold">{option.title}</span>
                    <span className="text-xs font-medium opacity-80">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="flex items-center justify-between text-sm font-bold text-moss-deep dark:text-cream">
                  Massa
                  <span className="rounded-full bg-sage-soft px-2.5 py-0.5 text-xs font-bold text-ink-deep dark:bg-moss/30 dark:text-cream">
                    {mass} kg
                  </span>
                </span>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={mass}
                  onChange={(event) => setMass(Number(event.target.value))}
                  className="mt-3 w-full"
                />
              </label>
              <label className="block">
                <span className="flex items-center justify-between text-sm font-bold text-moss-deep dark:text-cream">
                  Gaya
                  <span className="rounded-full bg-beige-soft px-2.5 py-0.5 text-xs font-bold text-ink-deep dark:bg-beige-deep/40 dark:text-cream">
                    {force} N
                  </span>
                </span>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={force}
                  onChange={(event) => setForce(Number(event.target.value))}
                  className="mt-3 w-full"
                />
              </label>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-beige/50 p-3.5 dark:bg-ink-muted/60">
                <dt className="text-xs font-medium text-moss-deep/80 dark:text-moss-soft/80">Percepatan</dt>
                <dd className="mt-1 text-xl font-bold text-moss-deep dark:text-cream">{acceleration} m/s²</dd>
              </div>
              <div className="rounded-2xl bg-beige/50 p-3.5 dark:bg-ink-muted/60">
                <dt className="text-xs font-medium text-moss-deep/80 dark:text-moss-soft/80">Mode</dt>
                <dd className="mt-1 text-xl font-bold text-moss-deep dark:text-cream">{currentLaw.title}</dd>
              </div>
            </dl>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={runSimulation}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-moss to-moss-deep px-4 text-sm font-bold text-cream shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:from-sage dark:to-moss dark:text-ink dark:shadow-float-dark dark:hover:shadow-lift-dark"
              >
                {isRunning ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />}
                {isRunning ? "Pause" : "Run"}
              </button>
              <button
                type="button"
                onClick={resetSimulation}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-moss/20 bg-beige/50 px-4 text-sm font-bold text-ink-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-moss hover:bg-beige focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:border-moss/30 dark:bg-ink-muted/50 dark:text-cream dark:hover:border-sage dark:hover:bg-ink-muted"
              >
                <RotateCcw size={16} aria-hidden="true" />
                Reset
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
