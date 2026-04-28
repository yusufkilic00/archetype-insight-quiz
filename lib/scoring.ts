import { QUESTIONS, TRAITS, ARCHETYPES, Trait, Archetype, Question } from './data';

export interface Answers { [qId: string]: number }

export interface QuizResult {
  main: Archetype;
  secondary: Archetype;
  third: Archetype;
  traitPercentages: Record<Trait, number>;
}

export function calculateResult(answers: Answers): QuizResult {
  const rawScores: Record<Trait, number> = { Clarity: 0, Action: 0, Empathy: 0, Structure: 0, Adaptability: 0 };
  const maxPossible: Record<Trait, number> = { Clarity: 0, Action: 0, Empathy: 0, Structure: 0, Adaptability: 0 };

  for (const q of QUESTIONS) {
    const val = answers[q.id] || 0;
    for (const t of TRAITS) {
      const w = q.weights[t] || 0;
      rawScores[t] += val * w;
      maxPossible[t] += 5 * w;
    }
  }

  const traitPercentages: Record<Trait, number> = {} as any;
  for (const t of TRAITS) {
    traitPercentages[t] = maxPossible[t] === 0 ? 0 : Math.round((rawScores[t] / maxPossible[t]) * 100);
  }

  const scores = ARCHETYPES.map(a => {
    let total = 0;
    for (const t of TRAITS) total += (traitPercentages[t] || 0) * (a.weights[t] || 0);
    return { archetype: a, score: total };
  });

  const sorted = scores.sort((a, b) => b.score - a.score);
  return { main: sorted[0].archetype, secondary: sorted[1].archetype, third: sorted[2].archetype, traitPercentages };
}
