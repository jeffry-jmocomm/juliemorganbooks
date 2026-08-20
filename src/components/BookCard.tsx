"use client";

import { ExternalLink } from "lucide-react";

interface BookCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  amazonLink?: string;
  buttonText?: string;
}

export default function BookCard({
  title,
  description,
  imageUrl,
  amazonLink = "#",
  buttonText = "Get the Book",
}: BookCardProps) {
  return (
    <div className="card-3d group h-full">
      <div className="card-3d-inner glass-panel hover-glow rounded-2xl overflow-hidden flex flex-col h-full">
        <div className="aspect-[2/3] w-full bg-[#111120] relative border-b border-white/5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#111120] to-[#1a1a2e]">
              <span className="font-bold text-slate-400 mb-2">{title}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest border border-slate-600 px-2 py-1 rounded">
                Cover
              </span>
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 text-white/90 leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-slate-400 mb-4 flex-1 line-clamp-3">
              {description}
            </p>
          )}
          <div className={description ? "mt-auto" : "mt-auto pt-4"}>
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white/[0.04] text-[var(--color-brand-purple-light)] border border-[var(--color-brand-purple)]/20 rounded-lg hover:bg-gradient-to-r hover:from-[var(--color-brand-blue)] hover:via-[var(--color-brand-purple)] hover:to-[var(--color-brand-pink)] hover:text-white hover:border-transparent transition-all duration-300 font-medium text-sm"
            >
              {buttonText} <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
