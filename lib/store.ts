'use client';
import { useState, useEffect, useCallback } from 'react';
import { Answers, QuizResult } from './scoring';
import { QUESTIONS } from './data';

interface QuizState {
  step: number;
  answers: Answers;
  result: QuizResult | null;
  isUnlocked: boolean;
  quizFinished: boolean;
}

const STORAGE_KEY = 'archetype_quiz_v1';
const defaultState: QuizState = { step: 1, answers: {}, result: null, isUnlocked: false, quizFinished: false };

export function useQuizStore() {
  const [state, setState] = useState<QuizState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { setState(JSON.parse(saved)); } catch {}
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const next = useCallback(() => setState(p => ({ ...p, step: Math.min(p.step + 1, QUESTIONS.length) })), []);
  const prev = useCallback(() => setState(p => ({ ...p, step: Math.max(p.step - 1, 1) })), []);
  const setAnswer = useCallback((qId: string, val: number) => setState(p => ({ ...p, answers: { ...p.answers, [qId]: val } })), []);
  const finish = useCallback(() => setState(p => ({ ...p, quizFinished: true })), []);
  const unlock = useCallback(() => setState(p => ({ ...p, isUnlocked: true })), []);
  const setResult = useCallback((res: QuizResult) => setState(p => ({ ...p, result: res })), []);
  
  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
    window.location.href = '/';
  }, []);

  return { state, hydrated, next, prev, setAnswer, finish, unlock, setResult, reset };
}
