'use client';
import { useQuizStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const STRIPE_ENABLED = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true';
const STRIPE_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || 'price_demo_123';

const included = [
  'Complete five-dimension trait map',
  'Primary, secondary, and tertiary archetype read',
  'Strengths and blind spots written for real work contexts',
  'Ideal working environment and collaboration preferences',
  'A focused 30-day adjustment to improve leverage',
];

const previewBlocks = [
  { label: 'Trait Signal', value: 'Your structure score is high enough to create reliability, but may slow decisions when stakes are ambiguous.' },
  { label: 'Working Style', value: 'You tend to perform best with clear ownership, lightweight rituals, and room to improve the system as you go.' },
  { label: 'Blind Spot', value: 'You may mistake more planning for more certainty. The report identifies where to move before everything is fully modeled.' },
];

export default function UnlockPage() {
  const router = useRouter();
  const { state, unlock, hydrated } = useQuizStore();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (hydrated && !state.quizFinished) router.replace('/quiz');
  }, [hydrated, state.quizFinished, router]);

  if (!hydrated) return <div className="min-h-screen flex items-center justify-center text-stone-500">Loading secure report...</div>;

  const handleCheckout = async () => {
    setStatus('processing');
    if (!STRIPE_ENABLED) {
      await new Promise((r) => setTimeout(r, 1400));
      unlock();
      setStatus('success');
      setTimeout(() => router.push('/results/report'), 900);
      return;
    }
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: STRIPE_PRICE_ID }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') return <SuccessView />;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 md:py-20 animate-fade-in">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.78fr] gap-6 lg:gap-10 items-start">
        <section className="space-y-7">
          <div className="space-y-4">
            <span className="inline-flex px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase bg-stone-100 text-stone-600 rounded-full">Report Ready</span>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">Unlock the full operating profile.</h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
              Your initial archetype is only the headline. The complete report explains what shaped the result, how your traits interact, and where your default style creates the most leverage.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Preview</p>
                <h2 className="text-xl font-semibold mt-1">What the report clarifies</h2>
              </div>
              <span className="text-xs text-stone-500">Personalized output</span>
            </div>
            <div className="space-y-3">
              {previewBlocks.map((block, i) => (
                <div key={block.label} className={`rounded-xl border border-stone-200 p-4 ${i > 0 ? 'relative overflow-hidden' : 'bg-stone-50'}`}>
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-stone-500 mb-2">{block.label}</p>
                  <p className={`text-sm leading-relaxed text-stone-700 ${i > 0 ? 'blur-[2px] select-none' : ''}`}>{block.value}</p>
                  {i > 0 && <div className="absolute inset-0 bg-white/45" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="bg-white rounded-2xl border border-stone-200 shadow-lg p-6 md:p-7 space-y-6 lg:sticky lg:top-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 mb-2">Complete Report</p>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Instant access</h2>
            <p className="text-sm text-stone-500 leading-relaxed mt-2">A concise premium report built from your quiz responses.</p>
          </div>

          <ul className="space-y-3 text-sm text-stone-700">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-5 border-t border-stone-100 flex items-end justify-between">
            <div>
              <span className="text-4xl font-semibold tracking-tight text-stone-900">$29</span>
              <span className="text-sm text-stone-500 ml-1">one-time</span>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full">No subscription</span>
          </div>

          <button onClick={handleCheckout} disabled={status === 'processing'}
            className={`w-full py-3.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              status === 'processing' ? 'bg-stone-200 text-stone-400 cursor-wait' : 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow-md'
            }`}>
            {status === 'processing' ? (
              <><span className="w-4 h-4 border-2 border-stone-400 border-t-stone-700 rounded-full animate-spin" /> Preparing checkout...</>
            ) : (
              <>Unlock Full Report</>
            )}
          </button>

          {status === 'error' && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">Checkout could not be started. Please try again.</p>
          )}

          <div className="flex items-center justify-center gap-4 pt-1">
            <span className="flex items-center gap-1.5 text-xs text-stone-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure checkout
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-xs text-stone-400">{STRIPE_ENABLED ? 'Stripe enabled' : 'Demo checkout'}</span>
          </div>
          <Link href="/results/preview" className="block text-center text-sm text-stone-500 hover:text-stone-800 transition-colors">Return to preview</Link>
        </aside>
      </div>
    </div>
  );
}

function SuccessView() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-2xl font-semibold text-stone-900 mb-2">Report Unlocked</h2>
      <p className="text-stone-500 max-w-sm">Preparing your complete profile now.</p>
    </div>
  );
}
