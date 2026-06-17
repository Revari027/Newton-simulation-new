"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { questions } from "@/data/questions";
import type { QuizState } from "@/types/quiz";

export function MiniQuiz() {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = useMemo(
    () => ((state.currentQuestionIndex + Number(answered || state.isFinished)) / questions.length) * 100,
    [answered, state.currentQuestionIndex, state.isFinished]
  );

  function submitAnswer() {
    if (selected === null || answered) return;

    setAnswered(true);
    if (selected === currentQuestion.correctAnswer) {
      setState((previous) => ({ ...previous, score: previous.score + 1 }));
    }
  }

  function nextQuestion() {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setState((previous) => ({ ...previous, isFinished: true }));
      return;
    }

    setSelected(null);
    setAnswered(false);
    setState((previous) => ({ ...previous, currentQuestionIndex: nextIndex }));
  }

  function resetQuiz() {
    setState({ currentQuestionIndex: 0, score: 0, isFinished: false });
    setSelected(null);
    setAnswered(false);
  }

  if (state.isFinished) {
    const percentage = Math.round((state.score / questions.length) * 100);

    return (
      <section id="quiz" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-newton-navy p-6 text-white shadow-panel sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-newton-amber">Hasil quiz</p>
          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_280px] md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">Skor {percentage}%</h2>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/72">
                Kamu menjawab {state.score} dari {questions.length} soal dengan benar. Ulangi quiz untuk memperkuat konsep yang belum stabil.
              </p>
            </div>
            <button
              type="button"
              onClick={resetQuiz}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-newton-amber px-5 text-sm font-bold text-newton-navy transition hover:bg-newton-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <RotateCcw size={18} aria-hidden="true" />
              Ulangi Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-newton-red">Mini quiz</p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-newton-navy sm:text-4xl">
            Evaluasi pemahaman
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-newton-navy/72">
            Soal dibuat dari konsep Hukum Newton I, II, dan III sesuai ruang lingkup SDD.
          </p>
          <div className="mt-6 rounded-lg border border-newton-navy/10 bg-white/70 p-4">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Progress</span>
              <span>
                {state.currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-newton-parchment">
              <div className="h-full rounded-full bg-newton-orange transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-newton-navy/10 bg-white/80 p-5 shadow-panel sm:p-6">
          <h3 className="text-xl font-bold tracking-normal text-newton-navy">{currentQuestion.question}</h3>
          <div className="mt-5 grid gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selected === index;
              const isCorrect = answered && index === currentQuestion.correctAnswer;
              const isWrong = answered && isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (!answered) setSelected(index);
                  }}
                  className={[
                    "flex min-h-12 items-center justify-between gap-3 rounded-md border px-4 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-newton-orange",
                    isCorrect
                      ? "border-green-500 bg-green-50 text-green-800"
                      : isWrong
                        ? "border-newton-red bg-red-50 text-newton-red"
                        : isSelected
                          ? "border-newton-orange bg-newton-amber/40 text-newton-navy"
                          : "border-newton-navy/12 bg-white text-newton-navy hover:border-newton-orange hover:bg-newton-parchment/60"
                  ].join(" ")}
                >
                  <span>{option}</span>
                  {isCorrect && <CheckCircle2 size={18} aria-hidden="true" />}
                  {isWrong && <XCircle size={18} aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            {!answered ? (
              <button
                type="button"
                onClick={submitAnswer}
                disabled={selected === null}
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-newton-navy px-5 text-sm font-bold text-white transition hover:bg-newton-red focus:outline-none focus:ring-2 focus:ring-newton-orange disabled:cursor-not-allowed disabled:bg-newton-navy/30"
              >
                Cek Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-newton-orange px-5 text-sm font-bold text-white transition hover:bg-newton-red focus:outline-none focus:ring-2 focus:ring-newton-navy"
              >
                {state.currentQuestionIndex === questions.length - 1 ? "Lihat Skor" : "Soal Berikutnya"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
