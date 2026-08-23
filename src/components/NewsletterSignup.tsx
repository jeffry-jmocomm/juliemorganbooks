"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";

export default function NewsletterSignup() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div id="mc_embed_signup">
        <form
          action="https://juliemorganbooks.us10.list-manage.com/subscribe/post" // Replace with actual Mailchimp action URL
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate relative"
          target="_blank"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                placeholder="Enter your email address"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/[0.04] border border-white/10 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-brand-purple)]/50 focus:bg-white/[0.06] transition-all duration-300"
              />
            </div>
            
            {/* hidden field to prevent bot signups */}
            <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
              <input type="text" name="b_placeholder_for_mailchimp_token" tabIndex={-1} defaultValue="" />
            </div>

            <button
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="btn-gradient px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              Subscribe <ArrowRight size={18} />
            </button>
          </div>
          <p className="text-slate-600 text-xs mt-4 pl-4 text-left">
            No spam, ever. Unsubscribe anytime. Join 3,000+ readers.
          </p>
        </form>
      </div>
    </div>
  );
}
