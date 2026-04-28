export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = Math.min((current / total) * 100, 100);
  return (
    <div className="mb-8 w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest">Question {current} of {total}</p>
        <p className="text-xs text-stone-400">{Math.round(progress)}% complete</p>
      </div>
      <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
        <div className="h-full bg-stone-800 transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
