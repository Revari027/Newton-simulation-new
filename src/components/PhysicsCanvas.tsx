"use client";

import Matter from "matter-js";
import { Pause, Play, RotateCcw } from "lucide-react";
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
  context.lineWidth = 5;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, startY);
  context.stroke();
  context.beginPath();
  context.moveTo(endX, startY);
  context.lineTo(endX - direction * 13, startY - 9);
  context.lineTo(endX - direction * 13, startY + 9);
  context.closePath();
  context.fill();
  context.font = "700 13px SF Pro Display, system-ui, sans-serif";
  context.fillText(label, Math.min(startX, endX) + Math.abs(length) / 2 - 18, startY - 12);
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const width = clamp(container.clientWidth || 960, 320, 1180);
    const height = width < 640 ? 320 : 390;
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

    const floor = Matter.Bodies.rectangle(width / 2, height - 24, width - 30, 28, {
      isStatic: true,
      render: { fillStyle: "#003049" }
    });
    const leftWall = Matter.Bodies.rectangle(12, height / 2, 22, height, {
      isStatic: true,
      render: { fillStyle: "rgba(0, 48, 73, 0.14)" }
    });
    const rightWall = Matter.Bodies.rectangle(width - 12, height / 2, 22, height, {
      isStatic: true,
      render: { fillStyle: "rgba(0, 48, 73, 0.14)" }
    });

    const primaryColor = law === "newton-2" ? "#D62828" : "#FCBF49";
    const primary = Matter.Bodies.rectangle(width * 0.24, height - 82, 82, 54, {
      friction: 0,
      frictionAir: law === "newton-1" ? 0 : 0.018,
      restitution: law === "newton-3" ? 1 : 0.15,
      render: { fillStyle: primaryColor }
    });
    Matter.Body.setMass(primary, mass);
    primaryBodyRef.current = primary;

    const bodies = [floor, leftWall, rightWall, primary];

    if (law === "newton-3") {
      const secondary = Matter.Bodies.rectangle(width * 0.72, height - 82, 82, 54, {
        friction: 0,
        frictionAir: 0,
        restitution: 1,
        render: { fillStyle: "#F77F00" }
      });
      Matter.Body.setMass(secondary, mass);
      secondaryBodyRef.current = secondary;
      bodies.push(secondary);
    } else {
      secondaryBodyRef.current = null;
    }

    Matter.Composite.add(world, bodies);

    Matter.Events.on(render, "afterRender", () => {
      const context = render.context;
      context.save();
      context.strokeStyle = "rgba(0, 48, 73, 0.08)";
      context.lineWidth = 1;
      for (let x = 40; x < width; x += 40) {
        context.beginPath();
        context.moveTo(x, 20);
        context.lineTo(x, height - 42);
        context.stroke();
      }
      for (let y = 40; y < height - 40; y += 40) {
        context.beginPath();
        context.moveTo(20, y);
        context.lineTo(width - 20, y);
        context.stroke();
      }

      context.fillStyle = "#003049";
      context.font = "700 14px SF Pro Display, system-ui, sans-serif";
      context.fillText(currentLaw.title, 24, 32);
      context.font = "500 12px SF Pro Text, system-ui, sans-serif";
      context.fillText(`Massa ${mass} kg | Gaya ${force} N | a ${acceleration} m/s2`, 24, 52);

      const primaryPosition = primary.position;
      context.fillStyle = "#003049";
      context.font = "700 12px SF Pro Display, system-ui, sans-serif";
      context.fillText(`${mass} kg`, primaryPosition.x - 16, primaryPosition.y + 4);

      if (runningRef.current && law === "newton-2") {
        drawArrow(context, primaryPosition.x + 50, primaryPosition.y - 8, clamp(force * 3, 36, 150), "#F77F00", `${force} N`);
      }

      if (runningRef.current && law === "newton-1") {
        drawArrow(context, primaryPosition.x + 50, primaryPosition.y - 8, 92, "#003049", "v konstan");
      }

      if (runningRef.current && law === "newton-3" && secondaryBodyRef.current) {
        const secondaryPosition = secondaryBodyRef.current.position;
        drawArrow(context, primaryPosition.x + 50, primaryPosition.y - 8, 74, "#D62828", "aksi");
        drawArrow(context, secondaryPosition.x - 50, secondaryPosition.y - 8, -74, "#F77F00", "reaksi");
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
    <section id="simulasi" className="bg-newton-navy py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="rounded-lg border border-white/12 bg-white/8 p-5 shadow-panel backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-newton-amber">Simulasi</p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal">Eksperimen gaya dan massa</h2>
          <div className="mt-6 grid gap-2">
            {lawOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setLaw(option.id)}
                className={[
                  "flex min-h-12 items-center justify-between rounded-md px-4 text-left transition focus:outline-none focus:ring-2 focus:ring-newton-amber",
                  law === option.id ? "bg-newton-amber text-newton-navy" : "bg-white/10 text-white hover:bg-white/16"
                ].join(" ")}
              >
                <span className="text-sm font-bold">{option.title}</span>
                <span className="text-xs font-medium opacity-80">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="flex items-center justify-between text-sm font-bold">
                Massa
                <span>{mass} kg</span>
              </span>
              <input
                type="range"
                min="1"
                max="12"
                value={mass}
                onChange={(event) => setMass(Number(event.target.value))}
                className="mt-3 w-full accent-newton-amber"
              />
            </label>
            <label className="block">
              <span className="flex items-center justify-between text-sm font-bold">
                Gaya
                <span>{force} N</span>
              </span>
              <input
                type="range"
                min="5"
                max="60"
                value={force}
                onChange={(event) => setForce(Number(event.target.value))}
                className="mt-3 w-full accent-newton-orange"
              />
            </label>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-white/10 p-3">
              <dt className="text-xs font-medium text-white/64">Percepatan</dt>
              <dd className="mt-1 text-xl font-bold">{acceleration} m/s2</dd>
            </div>
            <div className="rounded-md bg-white/10 p-3">
              <dt className="text-xs font-medium text-white/64">Mode</dt>
              <dd className="mt-1 text-xl font-bold">{currentLaw.title}</dd>
            </div>
          </dl>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={runSimulation}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-newton-amber px-4 text-sm font-bold text-newton-navy transition hover:bg-newton-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isRunning ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
              Run
            </button>
            <button
              type="button"
              onClick={resetSimulation}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-4 text-sm font-bold text-white transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-newton-amber"
            >
              <RotateCcw size={18} aria-hidden="true" />
              Reset
            </button>
          </div>
        </aside>

        <div className="overflow-hidden rounded-lg border border-white/12 bg-newton-parchment p-3 shadow-panel">
          <div ref={containerRef} className="min-h-[320px] w-full overflow-hidden rounded-md bg-white" />
        </div>
      </div>
    </section>
  );
}
