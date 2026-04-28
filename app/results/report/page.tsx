'use client';
import { useQuizStore } from '@/lib/store';
import { calculateResult } from '@/lib/scoring';
import { TRAITS } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReportPage() {
  const router = useRouter();
  const { state, setResult, reset, hydrated } = useQuizStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.quizFinished || !state.isUnlocked) { router.replace('/results/preview'); return; }
    if (!state.result) setResult(calculateResult(state.answers));
    setLoading(false);
  }, [hydrated, state.quizFinished, state.isUnlocked, state.result, state.answers, setResult, router]);

  if (loading || !state.result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-stone-500 px-4">
        <div className="w-48 h-1.5 bg-stone-100 rounded-full overflow-hidden mb-4">
          <div className="h-full w-3/4 bg-stone-800 rounded-full animate-pulse" />
        </div>
        <p>Preparing your report...</p>
      </div>
    );
  }

  const r = state.result;
  const dominantTrait = TRAITS
    .map((trait) => ({ trait, pct: r.traitPercentages[trait] || 0 }))
    .sort((a, b) => b.pct - a.pct)[0];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 md:py-20 max-w-5xl mx-auto animate-fade-in">
      <header className="mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Complete Insight Report</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3 mb-4">{r.main.name}</h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">{r.main.description}</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-4 min-w-48">
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-stone-500 mb-1">Dominant Signal</p>
            <p className="text-2xl font-semibold">{dominantTrait.trait}</p>
            <p className="text-sm text-stone-500">{dominantTrait.pct}% trait strength</p>
          </div>
        </div>
      </header>

      <section className="mb-12 md:mb-16">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 mb-2">Trait Breakdown</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How your responses distributed</h2>
          </div>
          <p className="hidden sm:block text-sm text-stone-500">Weighted from 15 responses</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TRAITS.map(trait => {
            const pct = r.traitPercentages[trait] || 0;
            return (
              <div key={trait} className="bg-white p-4 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between lg:block">
                  <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-500 lg:mb-3">{trait}</p>
                  <p className="text-2xl font-semibold">{pct}%</p>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-stone-800 transition-all duration-700 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="space-y-12 md:space-y-16">
        <section className="grid md:grid-cols-[0.32fr_1fr] gap-5 md:gap-8 border-t border-stone-200 pt-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-2">Strengths</p>
            <h2 className="text-2xl font-semibold tracking-tight">Where this style creates leverage</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {r.main.strengths.map((s, i) => (
              <div key={i} className="p-4 bg-white border border-stone-200 rounded-xl">
                <p className="text-sm font-medium text-stone-900">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-[0.32fr_1fr] gap-5 md:gap-8 border-t border-stone-200 pt-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Blind Spots</p>
            <h2 className="text-2xl font-semibold tracking-tight">Where the same pattern can create drag</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {r.main.blindSpots.map((s, i) => (
              <div key={i} className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <p className="text-sm font-medium text-amber-950">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-5 md:gap-6 border-t border-stone-200 pt-8">
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 mb-3">Working Style</p>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Best-fit environment</h2>
            <p className="text-stone-600 leading-relaxed">{r.main.workingStyle}</p>
          </div>
          <div className="bg-stone-900 text-white p-6 rounded-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400 mb-3">Guidance</p>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Next useful adjustment</h2>
            <p className="text-stone-300 leading-relaxed">{r.main.growthAdvice}</p>
          </div>
        </section>

        <section className="border-t border-stone-200 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 mb-4">Influence Stack</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <p className="text-sm text-stone-500 mb-1">Secondary influence</p>
              <p className="text-xl font-semibold">{r.secondary.name}</p>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">{r.secondary.teaser}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <p className="text-sm text-stone-500 mb-1">Tertiary layer</p>
              <p className="text-xl font-semibold">{r.third.name}</p>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">{r.third.teaser}</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-16 md:mt-20 text-center border-t border-stone-200 pt-8 space-y-4">
        <p className="text-sm text-stone-500">Your report is saved in this browser until you retake the assessment.</p>
        <button onClick={reset} className="px-6 py-3 bg-stone-100 text-stone-700 rounded-lg font-medium hover:bg-stone-200 transition-colors text-sm">Retake Assessment</button>
      </footer>
    </div>
  );
}
