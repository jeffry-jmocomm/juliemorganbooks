import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#01030a] py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-lg tracking-wider text-slate-200">JULIE MORGAN BOOKS</span>
          <p className="text-sm text-slate-500 text-center md:text-left">USA TODAY and Award-winning Bestselling Author.</p>
        </div>
        
        <div className="flex gap-4">
          <a href="https://facebook.com/juliemorganbook" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full hover-glow text-slate-300 hover:text-[var(--color-brand-blue)] transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://instagram.com/juliemorganbooks" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full hover-glow text-slate-300 hover:text-[var(--color-brand-purple)] transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="mailto:julie@juliemorganbooks.com" className="p-3 glass-panel rounded-full hover-glow text-slate-300 hover:text-white transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-600">
          <div className="flex gap-4 mb-1">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-slate-400 transition-colors">About Me</Link>
            <Link href="/#books" className="hover:text-slate-400 transition-colors">Books</Link>
          </div>
          <span>&copy; {new Date().getFullYear()} Julie Morgan Books</span>
          <span>Proudly powered by JMO Communications</span>
        </div>
      </div>
    </footer>
  );
}
