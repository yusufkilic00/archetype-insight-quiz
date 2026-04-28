'use client';
import { useQuizStore } from '@/lib/store';
import { QUESTIONS } from '@/lib/data';
import ProgressBar from '@/components/ui/ProgressBar';
import ScaleSelector from '@/components/ui/ScaleSelector';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuizPage() {
  const router = useRouter();
  const { state, next, prev, setAnswer, finish, hydrated } = useQuizStore();
  const currentQ = QUESTIONS[state.step - 1];

  useEffect(() => {
    if (hydrated && state.quizFinished) router.replace('/results/preview');
  }, [hydrated, state.quizFinished, router]);

  if (!hydrated || !currentQ) return <div className="min-h-screen flex items-center justify-center text-stone-500">Restoring assessment...</div>;

  const handleNext = () => state.step === QUESTIONS.length ? finish() : next();
  const answeredCount = Object.keys(state.answers).length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-20 animate-fade-in max-w-2xl mx-auto">
      <div className="w-full mb-8 flex items-center justify-between text-xs text-stone-400">
        <span className="font-semibold uppercase tracking-[0.18em]">Archetype Insight</span>
        <span>{answeredCount > 0 ? 'Progress saved' : 'Private session'}</span>
      </div>
      <ProgressBar current={state.step} total={QUESTIONS.length} />
      <ScaleSelector 
        label={currentQ.text} 
        value={state.answers[currentQ.id] || null} 
        onSelect={(v) => setAnswer(currentQ.id, v)} 
      />
      <div className="flex justify-between w-full mt-12">
        <button 
          onClick={prev} 
          disabled={state.step === 1}
          className={`px-5 py-3 text-sm font-medium rounded-lg transition-colors ${state.step === 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'}`}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!state.answers[currentQ.id]}
          className={`px-7 py-3 rounded-xl font-medium transition-all duration-200 ${
            state.answers[currentQ.id] 
              ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow-md' 
              : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
        >
          {state.step === QUESTIONS.length ? 'Generate Results' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
