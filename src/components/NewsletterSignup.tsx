"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're in! Welcome to the community.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === "loading" || status === "success"}
              className="w-full pl-12 pr-4 py-4 bg-white/[0.04] border border-white/10 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-brand-purple)]/50 focus:bg-white/[0.06] transition-all duration-300 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="btn-gradient px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {status === "loading" ? (
              <><Loader2 size={18} className="animate-spin" /> Subscribing...</>
            ) : status === "success" ? (
              <><Check size={18} /> Subscribed!</>
            ) : (
              <>Subscribe <ArrowRight size={18} /></>
            )}
          </button>
        </div>
        {message && (
          <p className={`text-xs mt-4 pl-4 text-left ${status === "success" ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
        {!message && (
          <p className="text-slate-600 text-xs mt-4 pl-4 text-left">
            No spam, ever. Unsubscribe anytime. Join 3,000+ readers.
          </p>
        )}
      </form>
    </div>
  );
}