"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down and past 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-[#020617] border-b border-white/10 px-6 py-4 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center">
          <img src="/julie-morgan-logo.png" alt="Julie Morgan Books" className="h-20 md:h-28 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <div className="flex items-center gap-6">
            <Link 
              href="/#books" 
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-white transition-colors"
            >
              Books
            </Link>
            <Link href="/audiobooks" className="hover:text-white transition-colors">Audiobooks</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Me</Link>
          </div>
          
          <div className="flex items-center gap-4 pl-6 border-l border-white/10">
            <a href="https://facebook.com/juliemorganbook" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[var(--color-brand-blue)] transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://instagram.com/juliemorganbooks" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[var(--color-brand-purple)] transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="mailto:julie@juliemorganbooks.com" className="text-slate-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
