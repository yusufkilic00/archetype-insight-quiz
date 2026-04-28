export type Trait = 'Clarity' | 'Action' | 'Empathy' | 'Structure' | 'Adaptability';
export const TRAITS: Trait[] = ['Clarity', 'Action', 'Empathy', 'Structure', 'Adaptability'];

export interface Question {
  id: string;
  text: string;
  weights: Record<Trait, number>;
}

export const QUESTIONS: Question[] = [
  { id: 'q1', text: 'I frame problems deliberately before jumping into solutions.', weights: { Clarity: 0.6, Structure: 0.3, Action: 0, Empathy: 0.1, Adaptability: 0 } },
  { id: 'q2', text: 'I prefer shipping a working version quickly rather than perfecting the plan.', weights: { Action: 0.6, Adaptability: 0.2, Structure: 0.1, Clarity: 0.1, Empathy: 0 } },
  { id: 'q3', text: 'I notice shifts in team energy before they become visible conflicts.', weights: { Empathy: 0.6, Adaptability: 0.2, Clarity: 0.1, Structure: 0.1, Action: 0 } },
  { id: 'q4', text: "I build repeatable workflows so outcomes don't depend on heroics.", weights: { Structure: 0.7, Clarity: 0.2, Action: 0.1, Empathy: 0, Adaptability: 0 } },
  { id: 'q5', text: 'I adjust my approach mid-stream when new constraints appear.', weights: { Adaptability: 0.6, Action: 0.2, Empathy: 0.1, Clarity: 0.1, Structure: 0 } },
  { id: 'q6', text: 'I translate ambiguous goals into specific, measurable next steps.', weights: { Clarity: 0.6, Structure: 0.2, Action: 0.1, Empathy: 0.1, Adaptability: 0 } },
  { id: 'q7', text: 'I maintain momentum even when I only have partial information.', weights: { Action: 0.5, Adaptability: 0.3, Structure: 0.1, Clarity: 0.1, Empathy: 0 } },
  { id: 'q8', text: 'I prioritize psychological safety when onboarding new collaborators.', weights: { Empathy: 0.5, Structure: 0.2, Clarity: 0.2, Adaptability: 0.1, Action: 0 } },
  { id: 'q9', text: 'I document decisions so teams can scale without constant alignment meetings.', weights: { Structure: 0.5, Clarity: 0.4, Empathy: 0.1, Action: 0, Adaptability: 0 } },
  { id: 'q10', text: 'I treat unexpected changes as data points rather than disruptions.', weights: { Adaptability: 0.5, Action: 0.3, Empathy: 0.1, Clarity: 0.1, Structure: 0 } },
  { id: 'q11', text: 'I communicate trade-offs explicitly before committing resources.', weights: { Clarity: 0.5, Structure: 0.3, Action: 0.1, Empathy: 0.1, Adaptability: 0 } },
  { id: 'q12', text: 'I break long-term initiatives into weekly delivery cycles.', weights: { Structure: 0.5, Action: 0.3, Clarity: 0.1, Empathy: 0.1, Adaptability: 0 } },
  { id: 'q13', text: 'I adjust my feedback style based on how each person processes critique.', weights: { Empathy: 0.5, Adaptability: 0.3, Clarity: 0.1, Structure: 0.1, Action: 0 } },
  { id: 'q14', text: 'I create decision frameworks that outlive specific projects.', weights: { Structure: 0.4, Clarity: 0.4, Empathy: 0.1, Action: 0.1, Adaptability: 0 } },
  { id: 'q15', text: 'I learn faster by testing assumptions in production than by modeling them on paper.', weights: { Action: 0.4, Adaptability: 0.4, Clarity: 0.1, Structure: 0.1, Empathy: 0 } }
];

export interface Archetype {
  id: string;
  name: string;
  teaser: string;
  description: string;
  strengths: string[];
  blindSpots: string[];
  workingStyle: string;
  growthAdvice: string;
  weights: Record<Trait, number>;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'visionary', name: 'The Visionary',
    teaser: 'You notice the shape of an opportunity early and turn scattered inputs into direction.',
    description: 'Visionaries are strongest when a team needs a clearer read on where the work is heading. You tend to connect weak signals, name the bigger pattern, and give people a reason to move in the same direction. Your value is not just having ideas; it is making ambiguous terrain easier to navigate.',
    strengths: ['Strategic framing', 'Narrative clarity', 'Pattern synthesis', 'Direction setting'],
    blindSpots: ['Leaving execution details under-specified', 'Moving too quickly into abstraction', 'Assuming others share the same context'],
    workingStyle: 'You work best with room to think ahead, then pressure-test the direction with a small group before the team commits. Short written briefs and focused decision meetings tend to suit you well.',
    growthAdvice: 'Translate the vision into a near-term operating map. A simple 30/60/90-day sequence keeps the direction useful and makes it easier for execution-minded partners to engage.',
    weights: { Clarity: 0.4, Adaptability: 0.2, Action: 0.2, Empathy: 0.15, Structure: 0.05 }
  },
  {
    id: 'builder', name: 'The Builder',
    teaser: 'You create momentum by getting real work into the world and learning from what happens next.',
    description: 'Builders turn uncertainty into movement. You are comfortable making progress before every variable is known, and you tend to trust live feedback more than extended theory. In the right environment, that bias toward action helps teams escape drift and find traction quickly.',
    strengths: ['Execution energy', 'Resourcefulness under constraint', 'Fast iteration', 'Practical problem solving'],
    blindSpots: ['Outrunning stakeholder alignment', 'Treating every issue as solvable through more effort', 'Failing to document what worked'],
    workingStyle: 'You operate best in short cycles with clear outcomes, high autonomy, and permission to adjust based on evidence. Heavy process slows you down unless it is clearly protecting quality.',
    growthAdvice: 'Add a light alignment checkpoint before major pushes. Fifteen minutes spent clarifying success criteria can keep speed from turning into rework.',
    weights: { Action: 0.4, Adaptability: 0.25, Structure: 0.15, Clarity: 0.1, Empathy: 0.1 }
  },
  {
    id: 'strategist', name: 'The Strategist',
    teaser: 'You see the architecture behind the outcome and reduce friction before it compounds.',
    description: 'Strategists bring order to moving parts. You tend to map dependencies, clarify ownership, and design workflows that make success repeatable. Your strongest contribution is often invisible at first: fewer dropped threads, cleaner decisions, and less avoidable noise as work scales.',
    strengths: ['Systems thinking', 'Dependency mapping', 'Risk anticipation', 'Operational clarity'],
    blindSpots: ['Waiting too long for a complete model', 'Over-building process for a temporary problem', 'Making the system clearer than the decision'],
    workingStyle: 'You prefer explicit ownership, visible decision gates, and documented workflows. You do well when the system is clear enough to reduce recurring coordination without becoming heavy.',
    growthAdvice: 'Ship the system at roughly 80% confidence. Real use will reveal the missing edge cases faster than more planning, and it keeps structure in service of progress.',
    weights: { Structure: 0.35, Clarity: 0.25, Adaptability: 0.15, Action: 0.15, Empathy: 0.1 }
  },
  {
    id: 'connector', name: 'The Connector',
    teaser: 'You notice the human dynamics that shape whether good work actually lands.',
    description: 'Connectors help teams move through complexity without losing trust. You are quick to sense misalignment, translate between perspectives, and create the conditions for clearer collaboration. Your strength is not just being supportive; it is making the social system more workable.',
    strengths: ['Stakeholder alignment', 'Conflict de-escalation', 'Cross-functional translation', 'Trust building'],
    blindSpots: ['Softening necessary friction', 'Absorbing work that should stay with others', 'Blurring decision clarity to preserve agreement'],
    workingStyle: 'You excel in environments with active feedback loops, thoughtful facilitation, and cross-functional work. One-on-one context gathering often helps you see what a group meeting misses.',
    growthAdvice: 'Use boundaries as a tool for better collaboration. Clear limits protect trust because they make ownership explicit and prevent quiet resentment from building.',
    weights: { Empathy: 0.4, Structure: 0.2, Clarity: 0.2, Action: 0.1, Adaptability: 0.1 }
  },
  {
    id: 'analyst', name: 'The Analyst',
    teaser: 'You look for the evidence beneath the story and separate signal from momentum.',
    description: 'Analysts bring discipline to uncertain decisions. You tend to validate assumptions, inspect the quality of inputs, and look for the leading indicators that others may miss. Your value is strongest when the team needs a decision grounded in reality instead of confidence alone.',
    strengths: ['Evidence-based judgment', 'Signal detection', 'Assumption testing', 'Quality control'],
    blindSpots: ['Letting better data delay a good-enough decision', 'Under-selling useful findings', 'Expecting metrics to resolve strategic judgment'],
    workingStyle: 'You do best with clear measurement frameworks, documented assumptions, and enough space for deep work. Your output lands better when analysis is paired with a concise recommendation.',
    growthAdvice: 'Define decision thresholds before you analyze. When the threshold is clear, data can move the decision forward instead of expanding the scope of the question.',
    weights: { Clarity: 0.35, Structure: 0.25, Action: 0.2, Adaptability: 0.1, Empathy: 0.1 }
  }
];
