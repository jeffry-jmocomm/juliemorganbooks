"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Force scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleBooksClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between min-h-[5rem] md:min-h-[7rem]">
          {/* Logo — always on left */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/julie-morgan-logo.png"
              alt="Julie Morgan Books"
              className="h-16 md:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links — always on right */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                onClick={handleBooksClick}
                className="hover:text-slate-900 transition-colors"
              >
                Books
              </Link>
              <Link
                href="/about"
                className="hover:text-slate-900 transition-colors"
              >
                About Me
              </Link>
              <Link
                href="/privacy"
                className="hover:text-slate-900 transition-colors"
              >
                Privacy
              </Link>
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-black/10">
              <a
                href="https://facebook.com/juliemorganbook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[var(--color-brand-purple)] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com/juliemorganbooks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[var(--color-brand-purple)] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@juliemorganbooks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[var(--color-brand-purple)] transition-colors"
              >
                <TikTokIcon size={20} />
              </a>
              <a
                href="mailto:julie@juliemorganbooks.com"
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[70] md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-white/60 backdrop-blur-3xl transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center"
              >
                <img
                  src="/julie-morgan-logo.png"
                  alt="Julie Morgan Books"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-8 py-10 flex flex-col gap-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                Navigation
              </p>
              {[
                { name: "Books", href: "/" },
                { name: "About Me", href: "/about" },
                { name: "Privacy", href: "/privacy" },
              ].map((item, i) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.href === "/" && pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`text-3xl font-serif text-slate-900 hover:text-[var(--color-brand-purple)] transition-all duration-300 transform ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Footer / Socials */}
            <div className="p-8 bg-slate-50/50 border-t border-black/5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                Connect With Julie
              </p>
              <div className="flex items-center gap-5 mb-8">
                <a
                  href="https://facebook.com/juliemorganbook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm hover:text-[var(--color-brand-purple)] transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/juliemorganbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm hover:text-[var(--color-brand-purple)] transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@juliemorganbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm hover:text-[var(--color-brand-purple)] transition-all"
                >
                  <TikTokIcon size={20} />
                </a>
                <a
                  href="mailto:julie@juliemorganbooks.com"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm hover:text-[var(--color-brand-purple)] transition-all"
                >
                  <Mail size={20} />
                </a>
              </div>
              <p className="text-xs text-slate-500 italic">
                &ldquo;Dark. Dirty. Dangerous. Romance.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
