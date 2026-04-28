import Link from 'next/link';

const productPillars = [
  {
    t: 'Pattern read',
    d: 'A compact assessment maps how you frame, move, relate, structure, and adapt under real working conditions.',
  },
  {
    t: 'Operating profile',
    d: 'Your result translates those signals into a primary archetype, secondary influences, and practical working guidance.',
  },
  {
    t: 'Applied direction',
    d: 'The report focuses on better decisions, cleaner collaboration, and sharper personal leverage, not generic motivation.',
  },
];

const sections = [
  {
    eyebrow: 'How It Works',
    title: 'Fifteen questions, scored across five working dimensions.',
    copy: 'Each answer contributes to a weighted profile across clarity, action, empathy, structure, and adaptability. The experience is intentionally short, but the output is designed to feel specific enough to use.',
  },
  {
    eyebrow: 'What You Unlock',
    title: 'A working-style report that reads like a useful briefing.',
    copy: 'You get your dominant archetype, secondary layers, trait percentages, strengths, blind spots, environment fit, and a focused recommendation for better execution.',
  },
  {
    eyebrow: 'Why It Matters',
    title: 'Most people can describe what they do. Fewer can name how they operate.',
    copy: 'Archetype Insight gives language to the patterns behind your decisions, collaboration style, and default response to ambiguity.',
  },
  {
    eyebrow: 'Report Preview',
    title: 'Example signal: strong structure with high adaptability.',
    copy: 'This combination often points to someone who can build durable systems without becoming rigid. The opportunity is usually knowing when enough structure is enough.',
  },
  {
    eyebrow: 'For Individuals',
    title: 'Make your own operating defaults easier to inspect.',
    copy: 'The assessment helps you identify where your instincts create leverage, and where those same instincts can quietly create drag.',
  },
  {
    eyebrow: 'For Teams',
    title: 'A cleaner way to discuss working style without turning it into identity.',
    copy: 'The language is practical and low-drama. It helps teams talk about pace, ambiguity, feedback, and decision-making with more precision.',
  },
  {
    eyebrow: 'Method',
    title: 'Designed around observable work behavior.',
    copy: 'Questions are framed around trade-offs people actually make: planning versus shipping, harmony versus candor, precision versus momentum.',
  },
  {
    eyebrow: 'Output',
    title: 'Clear enough to scan. Detailed enough to return to.',
    copy: 'The paid report is organized into concise sections so the result feels useful in a five-minute read and still holds up on a second pass.',
  },
  {
    eyebrow: 'Tone',
    title: 'No inflated labels, no personality theater.',
    copy: 'The product avoids fixed identities and leans into operational language: what tends to work, what tends to break, and what to adjust next.',
  },
  {
    eyebrow: 'Use Cases',
    title: 'Better onboarding, coaching, retros, and self-review.',
    copy: 'The result can support a manager 1:1, founder reflection, team kickoff, or personal development review without requiring a heavy workshop.',
  },
  {
    eyebrow: 'Experience',
    title: 'Fast assessment, deliberate reveal.',
    copy: 'Progress is saved locally, results are calculated instantly, and the unlock step previews the report before asking for a decision.',
  },
  {
    eyebrow: 'Positioning',
    title: 'Built for operators who want sharper self-knowledge.',
    copy: 'This is for people who care about how work gets done: founders, product leads, consultants, strategists, and anyone responsible for moving ambiguous work forward.',
  },
];

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      <section className="px-4 sm:px-6 pt-20 pb-14 md:pt-28 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Archetype Insight
                <span className="h-1 w-1 rounded-full bg-stone-300" />
                15-question operating profile
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.03]">
                  See the pattern behind how you work.
                </h1>
                <p className="text-lg md:text-xl text-stone-600 max-w-2xl leading-relaxed">
                  A premium assessment for operators, founders, and product-minded teams who want a clearer read on decision style, momentum, collaboration, and blind spots.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link href="/quiz" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-stone-900 text-white rounded-xl text-base font-medium hover:bg-stone-800 transition-all shadow-sm hover:shadow-md">
                  Start Assessment
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <p className="text-sm text-stone-500">Progress saves locally. Results are instant.</p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Sample Report</p>
                  <p className="font-medium text-stone-900 mt-1">Operating Profile</p>
                </div>
                <span className="text-xs rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 font-medium">Ready in minutes</span>
              </div>
              <div className="space-y-4">
                {[
                  ['Clarity', 84],
                  ['Action', 72],
                  ['Structure', 79],
                  ['Empathy', 61],
                  ['Adaptability', 68],
                ].map(([label, pct]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-stone-800">{label}</span>
                      <span className="text-stone-500">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full rounded-full bg-stone-800" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-stone-500 mb-2">Primary</p>
                  <p className="font-semibold">The Strategist</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-stone-500 mb-2">Watch For</p>
                  <p className="font-semibold">Over-structuring</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-14">
            {productPillars.map((b) => (
              <div key={b.t} className="p-5 bg-white rounded-xl border border-stone-200">
                <h3 className="font-medium mb-2 text-stone-900">{b.t}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ['15', 'calibrated questions'],
            ['5', 'working dimensions'],
            ['3', 'archetype layers'],
            ['1', 'focused report'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-3xl font-semibold tracking-tight">{value}</p>
              <p className="text-sm text-stone-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-14 gap-y-10">
          {sections.map((section) => (
            <article key={section.eyebrow} className="border-t border-stone-200 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 mb-3">{section.eyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight mb-3">{section.title}</h2>
              <p className="text-stone-600 leading-relaxed">{section.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto border-t border-stone-200 pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 mb-3">Begin</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl">Build a cleaner picture of your operating style.</h2>
          </div>
          <Link href="/quiz" className="inline-flex items-center justify-center px-7 py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors">
            Take the Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
