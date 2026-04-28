import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archetype Insight',
  description: 'A premium operating-style assessment for leaders and teams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 min-h-screen text-stone-900 flex flex-col">
        <main className="flex-1 w-full">{children}</main>
        <footer className="py-8 text-center text-xs text-stone-400 border-t border-stone-200">
          © 2026 Archetype Insight • Private assessment demo
        </footer>
      </body>
    </html>
  );
}
