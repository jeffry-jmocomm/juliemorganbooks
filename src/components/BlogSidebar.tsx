"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogSidebar({
  years = [],
  currentYear,
  categories = [],
  currentCategory,
}: {
  years?: string[];
  currentYear?: string;
  categories?: { title: string; slug: string }[];
  currentCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (currentYear) params.set("year", currentYear);
    if (currentCategory) params.set("category", currentCategory);

    router.push(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <aside className="space-y-12">
      {/* Search Bar */}
      <div className="sticky top-0 z-20 rounded-t-4xl p-2 pb-8 pt-2 bg-gradient-to-b from-[#0d0d1b] via-[#0d0d1b]/90 to-transparent pointer-events-none">
        <form onSubmit={handleSearch} className="relative pointer-events-auto">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-[var(--color-brand-purple-light)]/50 transition-all"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Chronicle Archive */}
      <div className="px-4">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6 flex items-center gap-4">
          Chronicle Archive
          <div className="h-px bg-white/5 flex-1" />
        </h4>

        <div className="relative pl-4 space-y-4 border-l border-white/5">
          <Link
            href="/blog"
            className={`block text-sm transition-all hover:text-white ${
              !currentYear
                ? "text-[var(--color-brand-purple-light)] font-bold"
                : "text-slate-500"
            }`}
          >
            All Posts
          </Link>
          {years.map((year) => (
            <Link
              key={year}
              href={`/blog?year=${year}`}
              className={`block text-sm transition-all hover:text-white ${
                currentYear === year
                  ? "text-[var(--color-brand-purple-light)] font-bold"
                  : "text-slate-500"
              }`}
            >
              {year}
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="px-4">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6 flex items-center gap-4">
            Categories
            <div className="h-px bg-white/5 flex-1" />
          </h4>

          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                // key={cat.slug}
                // href={`/blog?category=${cat.slug}`}
                key={cat.slug ?? cat.title}
                href={`/blog?category=${cat.slug ?? cat.title}`}
                className={`block text-sm transition-all hover:text-white ${
                  currentCategory === cat.slug
                    ? "text-[var(--color-brand-purple-light)] font-bold"
                    : "text-slate-500"
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Author Profile */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-purple)]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[var(--color-brand-purple)]/10 transition-colors" />

        <h3 className="text-2xl font-bold mb-4 gradient-text">Julie Morgan</h3>

        <div className="space-y-4">
          <p className="text-sm font-medium text-white/90">
            Want to join my newsletter?{" "}
            <Link
              href="/newsletter"
              className="text-[var(--color-brand-purple-light)] hover:underline"
            >
              Click here!
            </Link>
          </p>

          <p className="text-sm text-slate-400 leading-relaxed">
            Originally from Burleson, Texas Julie always had a love of books,
            especially paranormal stories. Julie finally took the leap to begin
            writing with encouragement from her family.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Having worked in IT her entire career, Julie now spends her free
            time writing. Living in Central Florida with her husband and
            daughter, her favorite pastime is reading children&apos;s stories to
            her daughter, especially those around animals.
          </p>
        </div>
      </div>

      {/* Social Links (Optional but good for sidebar) */}
      <div className="px-4">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6">
          Connect
        </h4>
        <div className="flex gap-4">
          {/* Reuse social icons logic if needed, or keep it simple */}
          <a
            href="https://facebook.com/juliemorganbook"
            className="text-slate-500 hover:text-white transition-colors"
          >
            FB
          </a>
          <a
            href="https://instagram.com/juliemorganbooks"
            className="text-slate-500 hover:text-white transition-colors"
          >
            IG
          </a>
          <a
            href="https://www.tiktok.com/@juliemorganbooks"
            className="text-slate-500 hover:text-white transition-colors"
          >
            TT
          </a>
        </div>
      </div>
    </aside>
  );
}
