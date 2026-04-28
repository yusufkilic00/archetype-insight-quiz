'use client';
import { useQuizStore } from '@/lib/store';
import { calculateResult } from '@/lib/scoring';
import { TRAITS } from '@/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PreviewPage() {
  const router = useRouter();
  const { state, setResult, hydrated } = useQuizStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.quizFinished) { router.replace('/quiz'); return; }
    if (!state.result) setResult(calculateResult(state.answers));
    setLoading(false);
  }, [hydrated, state.quizFinished, state.result, state.answers, setResult, router]);

  if (loading || !state.result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-stone-500 px-4">
        <div className="w-48 h-1.5 bg-stone-100 rounded-full overflow-hidden mb-4">
          <div className="h-full w-2/3 bg-stone-800 rounded-full animate-pulse" />
        </div>
        <p>Analyzing response patterns...</p>
      </div>
    );
  }

  const topTraits = TRAITS
    .map((trait) => ({ trait, pct: state.result?.traitPercentages[trait] || 0 }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 md:py-20 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10 md:mb-12">
        <span className="inline-flex px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase bg-stone-100 text-stone-600 rounded-full mb-6">Initial Read</span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">{state.result.main.name}</h1>
        <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">{state.result.main.teaser}</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_0.9fr] gap-5 md:gap-6 items-start">
        <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 mb-4">Unlocked Preview</p>
          <div className="space-y-4">
            {topTraits.map(({ trait, pct }) => (
              <div key={trait}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-stone-800">{trait}</span>
                  <span className="text-stone-500">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-stone-800 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-500 mb-2">Secondary Influence</p>
              <p className="font-medium">{state.result.secondary.name}</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-500 mb-2">Tertiary Layer</p>
              <p className="font-medium">{state.result.third.name}</p>
            </div>
          </div>
        </section>

        <aside className="bg-stone-900 text-white p-6 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400 mb-3">Full Report Includes</p>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">The context behind the score.</h2>
          <ul className="space-y-3 text-sm text-stone-300">
            {[
              'Full five-trait breakdown with interpretation',
              'Strengths, blind spots, and working-style guidance',
              'Secondary and tertiary archetype influence notes',
              'One practical growth recommendation for the next 30 days',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-stone-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/results/unlock" className="mt-6 w-full inline-flex justify-center px-6 py-3.5 bg-white text-stone-900 rounded-xl font-medium hover:bg-stone-100 transition-colors">
            Unlock Full Report
          </Link>
        </aside>
      </div>
    </div>
  );
}
