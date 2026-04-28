import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-2">This assessment page is not available</h2>
      <p className="text-stone-500 mb-8">Return to the start to continue from a clean session.</p>
      <Link href="/" className="px-6 py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
