export default function ScaleSelector({ label, value, onSelect }: { label: string; value: number | null; onSelect: (v: number) => void }) {
  return (
    <div className="space-y-7 animate-fade-in w-full">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">Choose the closest fit</p>
        <p className="text-2xl md:text-3xl font-medium text-stone-900 leading-tight tracking-tight">{label}</p>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onSelect(n)}
              aria-label={`Select ${n} out of 5`}
              className={`py-4 rounded-xl border transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2
                ${value === n 
                  ? 'border-stone-900 bg-stone-900 text-white shadow-md scale-[1.01]' 
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:bg-stone-50'}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs font-semibold text-stone-400 uppercase tracking-wide">
          <span>Strongly disagree</span>
          <span>Strongly agree</span>
        </div>
      </div>
    </div>
  );
}
