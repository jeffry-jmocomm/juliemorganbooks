"use client";

import { motion } from "framer-motion";
import { Mail, BookOpen, Heart, Bell } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import NewsletterSignup from "@/components/NewsletterSignup";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function NewsletterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <FloatingParticles count={15} type="sparkles" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand-purple)]/[0.08] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-brand-purple)]/15 text-[var(--color-brand-purple-light)] text-xs font-bold tracking-widest uppercase mb-8">
            <Mail size={14} /> Newsletter
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 gradient-text leading-tight pb-4">
            Join Julie Morgan's newsletter today!
          </h1>
          <p className="text-lg text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
            Be the first to know about new releases, cover reveals, exclusive
            bonus content, and behind-the-scenes updates from Julie Morgan.
          </p>

          <NewsletterSignup />
        </motion.div>
      </section>
      {/* What You Get */}
      {/* <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 text-white/90">
              What you&apos;ll get
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "New Release Alerts",
                  desc: "Never miss a launch. Get notified the moment a new book drops — sometimes before anyone else.",
                },
                {
                  icon: Heart,
                  title: "Exclusive Content",
                  desc: "Bonus chapters, deleted scenes, character backstories, and behind-the-scenes peeks into Julie's writing process.",
                },
                {
                  icon: Bell,
                  title: "Giveaways & Events",
                  desc: "Early access to cover reveals, signed book giveaways, and live reading events with Julie.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-panel p-8 rounded-2xl border border-white/[0.06] hover-glow transition-all text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-purple)]/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon
                      className="text-[var(--color-brand-purple-light)]"
                      size={24}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
