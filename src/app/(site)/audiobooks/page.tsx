"use client";

import { motion } from "framer-motion";
import { Headphones, PlayCircle } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

interface AudiobookCardProps {
  title: string;
  imageUrl: string;
  audibleLink?: string;
}

function AudiobookCard({ title, imageUrl, audibleLink = "#" }: AudiobookCardProps) {
  return (
    <motion.div variants={fadeIn} className="glass-panel hover-glow rounded-3xl overflow-hidden flex flex-col group h-full">
      <div className="aspect-[2/3] w-full relative overflow-hidden bg-slate-200 border-b border-black/5">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col text-center">
        <h3 className="text-xl font-bold mb-6 text-slate-900 leading-tight">{title}</h3>
        <div className="mt-auto">
          <a 
            href={audibleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-3 px-4 bg-[var(--color-brand-purple)]/10 text-[var(--color-brand-purple)] border border-[var(--color-brand-purple)]/30 rounded-full hover:bg-[var(--color-brand-purple)] hover:text-white transition-all font-bold tracking-wide"
          >
            <Headphones size={20} /> Listen on Audible
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function AudiobooksPage() {
  return (
    <div className="min-h-screen py-32 px-6 overflow-hidden relative">
      
      {/* Background Soundwave Graphic */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[400px] -z-10 pointer-events-none flex justify-between items-end opacity-[0.08]">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: "10%" }}
            animate={{ height: ["10%", "80%", "30%", "100%", "20%"] }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity, 
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="w-4 bg-gradient-to-t from-[var(--color-brand-purple)] to-[var(--color-brand-purple)] rounded-t-full"
            style={{ filter: "blur(2px)" }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center justify-center p-4 bg-[var(--color-brand-purple)]/10 rounded-full mb-6 ring-1 ring-[var(--color-brand-purple)]/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <Headphones size={32} className="text-[var(--color-brand-purple)]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-slate-900">
              Available Audiobooks
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience Julie Morgan's rich worlds in a whole new way. Immersive storytelling narrated to bring every character vividly to life.
            </p>
          </motion.div>
        </div>

        {/* Covenant Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">The Covenant of New Orleans</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--color-brand-purple)] to-transparent mx-auto mt-6 opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <AudiobookCard title="The Concubine and Her Vampires" imageUrl="/the-covenant-of-new-orleans-the-concubine-and-her-vampires.jpg" />
            <AudiobookCard title="The Human and Her Vampires" imageUrl="/the-covenant-of-new-orleans-the-human-and-her-vampires.jpg" />
            <AudiobookCard title="The Demon and Her Vampires" imageUrl="/the-covenant-of-new-orleans-the-demon-and-her-vampires.jpg" />
          </div>
        </motion.div>

        {/* Alchemy Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">The Alchemy Series</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--color-brand-purple)] to-transparent mx-auto mt-6 opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <AudiobookCard title="Deadly Alchemy" imageUrl="/the-alchemy-series-deadly-alchemy.jpg" />
            <AudiobookCard title="Fatal Alchemy" imageUrl="/the-alchemy-series-fatal-alchemy.jpeg" />
            <AudiobookCard title="Wicked Alchemy" imageUrl="/the-alchemy-series-wicked-alchemy.jpg" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
