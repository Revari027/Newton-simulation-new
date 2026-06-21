"use client";

import { CheckCircle2, RotateCcw, Sparkles, Trophy, XCircle } from "lucide-react";
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
    () =>
      ((state.currentQuestionIndex + Number(answered || state.isFinished)) /
        questions.length) *
      100,
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
    const verdict =
      percentage >= 80
        ? { label: "Luar biasa!", tone: "text-sage-deep dark:text-sage-soft" }
        : percentage >= 60
          ? { label: "Kerja bagus", tone: "text-moss-deep dark:text-cream" }
          : { label: "Tetap berlatih", tone: "text-moss-deep dark:text-moss-soft" };

    return (
      <section id="quiz" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-4xl border border-beige/60 bg-gradient-to-br from-sage-soft via-cream to-beige-soft p-8 text-center shadow-float dark:border-moss/30 dark:from-ink-muted/60 dark:via-ink-soft/40 dark:to-ink-deep/60 dark:shadow-float-dark sm:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-sage/40 blur-3xl dark:bg-sage/20" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-beige/50 blur-3xl dark:bg-moss/20" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-cream/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-moss-deep shadow-soft dark:border-sage/30 dark:bg-ink-soft/70 dark:text-sage-soft dark:shadow-soft-dark">
                <Trophy size={13} className="text-sage-deep dark:text-sage-soft" /> Hasil quiz
              </span>
              <h2 className="mt-5 text-6xl font-bold tracking-tight text-moss-deep dark:text-cream sm:text-7xl">
                <span className="text-gradient">{percentage}%</span>
              </h2>
              <p className={`mt-2 text-lg font-bold ${verdict.tone}`}>
                {verdict.label}
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-6 text-moss-deep dark:text-moss-soft">
                Kamu menjawab {state.score} dari {questions.length} soal dengan benar. Ulangi quiz untuk memperkuat konsep yang belum stabil.
              </p>
              <button
                type="button"
                onClick={resetQuiz}
                className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-moss to-moss-deep px-7 text-sm font-bold text-cream shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:from-sage dark:to-moss dark:text-ink dark:shadow-float-dark dark:hover:shadow-lift-dark"
              >
                <RotateCcw size={16} aria-hidden="true" className="transition-transform duration-500 group-hover:-rotate-180" />
                Ulangi Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="inline-flex animate-fade-up items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sage-deep dark:text-sage-soft">
            <Sparkles size={13} className="text-sage-deep dark:text-sage-soft" /> Mini quiz
          </p>
          <h2
            className="mt-3 animate-fade-up text-4xl font-bold tracking-tight text-moss-deep dark:text-cream sm:text-5xl"
            style={{ animationDelay: "0.08s" }}
          >
            Evaluasi pemahaman.
          </h2>
        </div>

        {/* progress */}
        <div
          className="animate-fade-up mb-5 flex items-center gap-4"
          style={{ animationDelay: "0.14s" }}
        >
          <span className="shrink-0 rounded-full bg-sage-soft px-3 py-1 text-xs font-bold text-ink-deep dark:bg-moss/30 dark:text-cream">
            {state.currentQuestionIndex + 1} / {questions.length}
          </span>
          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-beige dark:bg-ink-muted">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-sage via-moss to-sage-deep transition-all duration-500 ease-out dark:from-sage dark:via-moss-soft dark:to-sage"
              style={{ width: `${progress}%` }}
            >
              <div aria-hidden="true" className="shimmer-line absolute inset-0" />
            </div>
          </div>
        </div>

        {/* question card */}
        <div
          key={state.currentQuestionIndex}
          className="animate-fade-up rounded-4xl border border-beige/60 bg-cream/80 p-6 shadow-float backdrop-blur-sm dark:border-moss/30 dark:bg-ink-soft/50 dark:shadow-float-dark sm:p-8"
        >
          <h3 className="text-xl font-bold leading-7 tracking-tight text-moss-deep dark:text-cream sm:text-2xl">
            {currentQuestion.question}
          </h3>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
                    "card-soft flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage",
                    isCorrect
                      ? "border-sage-deep bg-sage-soft text-moss-deep dark:border-sage dark:bg-moss/30 dark:text-cream"
                      : isWrong
                        ? "border-moss-deep bg-moss-soft text-moss-deep dark:border-moss-soft dark:bg-ink-muted dark:text-cream"
                        : isSelected
                          ? "border-sage bg-sage-soft text-moss-deep dark:border-sage dark:bg-moss/30 dark:text-cream"
                          : "border-moss/15 bg-beige/40 text-moss-deep hover:-translate-y-0.5 hover:border-sage hover:bg-beige/70 hover:text-moss-deep dark:border-moss/25 dark:bg-ink-muted/40 dark:text-moss-soft dark:hover:border-sage dark:hover:bg-ink-muted dark:hover:text-cream"
                  ].join(" ")}
                >
                  <span>{option}</span>
                  {isCorrect && <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-sage-deep dark:text-sage-soft" />}
                  {isWrong && <XCircle size={18} aria-hidden="true" className="shrink-0 text-moss-deep dark:text-cream" />}
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
            {!answered ? (
              <button
                type="button"
                onClick={submitAnswer}
                disabled={selected === null}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-moss to-moss-deep px-7 text-sm font-bold text-cream shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:cursor-not-allowed disabled:bg-moss/30 disabled:bg-none disabled:shadow-none disabled:hover:translate-y-0 dark:from-sage dark:to-moss dark:text-ink dark:shadow-float-dark dark:hover:shadow-lift-dark dark:disabled:bg-moss/20"
              >
                Cek Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-sage-deep to-moss px-7 text-sm font-bold text-cream shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:from-moss-soft dark:to-sage dark:text-ink dark:shadow-float-dark dark:hover:shadow-lift-dark"
              >
                {state.currentQuestionIndex === questions.length - 1 ? "Lihat Skor" : "Soal Berikutnya"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
