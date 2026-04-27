import Link from 'next/link';
import { Mail } from 'lucide-react';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-lg tracking-wider text-slate-800">JULIE MORGAN BOOKS</span>
          <p className="text-sm text-slate-500 text-center md:text-left">USA TODAY and Award-winning Bestselling Author.</p>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://facebook.com/juliemorganbook" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full hover-glow text-slate-600 hover:text-[var(--color-brand-purple)] transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://instagram.com/juliemorganbooks" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full hover-glow text-slate-600 hover:text-[var(--color-brand-purple)] transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.tiktok.com/@juliemorganbooks" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full hover-glow text-slate-600 hover:text-[var(--color-brand-purple)] transition-colors">
            <TikTokIcon size={20} />
          </a>
          <a href="mailto:julie@juliemorganbooks.com" className="p-3 glass-panel rounded-full hover-glow text-slate-600 hover:text-slate-900 transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-500">
          <div className="flex gap-6 mb-2 font-medium">
            <Link href="/privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-slate-800 transition-colors">About Me</Link>
            <Link href="/#books" className="hover:text-slate-800 transition-colors">Books</Link>
          </div>
          <p>© {new Date().getFullYear()} Julie Morgan. All rights reserved.</p>
          <span>Proudly powered by JMO Communications</span>
        </div>
      </div>
    </footer>
  );
}
