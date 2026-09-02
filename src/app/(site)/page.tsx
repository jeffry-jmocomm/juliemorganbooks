"use client";

import { motion } from "framer-motion";
import BookCard from "@/components/BookCard";
import FloatingParticles from "@/components/FloatingParticles";
import EnergyFlow from "@/components/EnergyFlow";
import {
  IconParanormalFantasy,
  IconRomance,
  IconParanormalSupernatural,
} from "@/components/GenreIcons";
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// ── Book data ────────────────────────────────────────────────────────────────
const SPEED_DATING = [
  {
    title: "Samael",
    imageUrl: "/speed-dating-the-denizens-samael.jpg",
    amazonLink: "https://books2read.com/u/31wXvl",
  },
  {
    title: "Hell's Belle",
    imageUrl: "/speed-dating-the-denizens-hells-belle.jpg",
    amazonLink: "https://books2read.com/u/meQVP9",
  },
  {
    title: "Cassiel",
    imageUrl: "/speed-dating-the-denizens-cassiel.jpg",
    amazonLink: "https://books2read.com/u/b69onM",
  },
  {
    title: "Alastor",
    imageUrl: "/speed-dating-the-denizens-alastor.jpg",
    amazonLink: "https://books2read.com/u/4Eq2GA",
  },
];

const COVENANT = [
  {
    title: "The Concubine and Her Vampires",
    imageUrl: "/the-covenant-of-new-orleans-the-concubine-and-her-vampires.jpg",
    amazonLink: "https://books2read.com/u/3J1Erv",
  },
  {
    title: "The Human and Her Vampires",
    imageUrl: "/the-covenant-of-new-orleans-the-human-and-her-vampires.jpg",
    amazonLink: "http://www.books2read.com/humanv",
  },
  {
    title: "The Demon and Her Vampires",
    imageUrl: "/the-covenant-of-new-orleans-the-demon-and-her-vampires.jpg",
    amazonLink: "https://books2read.com/u/mgJ7qX",
  },
];

const BLOOD_CHRONICLES = [
  {
    title: "Blood Chronicles: New Orleans",
    imageUrl: "/blood-chronicles-new-orleans.jpg",
    amazonLink: "https://books2read.com/u/3n6drR",
  },
  {
    title: "Blood Chronicles: Paris",
    imageUrl: "/blood-chronicles-paris.jpg",
    amazonLink: "https://books2read.com/u/bpB7lW",
  },
];

const FAIRY_TALE = [
  {
    title: "The Beast Underneath",
    imageUrl: "/the-fairytale-retellings-the-beast-underneath.jpg",
    amazonLink: "https://www.amazon.com/dp/B07GRWJDJ9/",
  },
  {
    title: "The Huntress",
    imageUrl: "/the-fairytale-retellings-the-huntress.jpg",
    amazonLink: "https://www.amazon.com/gp/product/B07HGMLB4N",
  },
  {
    title: "Ella's Prince",
    imageUrl: "/ellas-prince.jpg",
    amazonLink: "https://amzn.to/37TLzGS",
  },
  {
    title: "Fairytale Chronicles: 3-in-1 Collection",
    imageUrl: "/fairytale-chronicles-3-in-1.png",
    amazonLink: "https://www.amazon.com/dp/B08Q8NNVKJ",
  },
];

const ALCHEMY = [
  {
    title: "Deadly Alchemy",
    imageUrl: "/the-alchemy-series-deadly-alchemy.jpg",
    amazonLink:
      "https://www.amazon.com/Deadly-Alchemy-Book-ebook/dp/B00ROCE9AY",
  },
  {
    title: "Fatal Alchemy",
    imageUrl: "/the-alchemy-series-fatal-alchemy.jpeg",
    amazonLink: "https://www.amazon.com/gp/product/B01ATHW9IE",
  },
  {
    title: "Wicked Alchemy",
    imageUrl: "/the-alchemy-series-wicked-alchemy.jpg",
    amazonLink: "https://www.amazon.com/gp/product/B0793SKPGG",
  },
];

const RISE_ALPHA = [
  {
    title: "Alpha Rising",
    imageUrl: "/rise-of-the-alpha-series-alpha-rising.jpg",
    amazonLink: "http://books2read.com/alpharising1",
  },
  {
    title: "Alpha Risen",
    imageUrl: "/rise-of-the-alpha-series-alpha-risen.jpg",
    amazonLink: "http://books2read.com/alpharisen1",
  },
  {
    title: "Alpha Redeemed",
    imageUrl: "/alpha-redeemed.jpg",
    amazonLink: "https://books2read.com/alpharedeemed1",
  },
  {
    title: "An Alpha Christmas",
    imageUrl: "/an-alpha-christmas.jpg",
    amazonLink: "http://books2read.com/alphachristmas1",
  },
];

const CHRONICLES = [
  {
    title: "The Sassy Queen",
    imageUrl: "/chronicles-of-the-veil-series-the-sassy-queen.jpeg",
    amazonLink: "https://magicandmayhemuniverse.com/julie-morgan/",
  },
  {
    title: "The Sassy Goddess",
    imageUrl: "/chronicles-of-the-veil-series-the-sassy-goddess.jpg",
    amazonLink: "https://magicandmayhemuniverse.com/julie-morgan/",
  },
  {
    title: "The Cheeky Prince",
    imageUrl: "/the-cheeky-prince.jpg",
    amazonLink: "https://magicandmayhemuniverse.com/julie-morgan/",
  },
];

const MISADVENTURES = [
  {
    title: "Misadventures with a Firefighter",
    imageUrl: "/misadventures-with-a-firefighter.webp",
    amazonLink: "https://books2read.com/mfirefighter",
  },
  {
    title: "Misadventures with a Lawyer",
    imageUrl: "/misadventures-with-a-lawyer.webp",
    amazonLink: "https://books2read.com/mlawyer",
  },
];

const STANDALONES = [
  {
    title: "Dragon Master",
    imageUrl: "/stand-alones-dragon-master.jpg",
    amazonLink:
      "https://www.amazon.com/Dragon-Master-Julie-Morgan-ebook/dp/B01IAAJAWK",
  },
  {
    title: "Stone Obsession",
    imageUrl: "/stand-alones-stone-obsession.jpg",
    amazonLink: "http://www.books2read.com/stone-obsession",
  },
];

// ── Reusable layout components ────────────────────────────────────────────────
function SeriesLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 bg-[var(--color-brand-purple)]/15 text-[var(--color-brand-purple-light)] text-xs font-bold tracking-widest uppercase rounded mb-4">
      {children}
    </span>
  );
}

function SeriesWithBlurb({
  label,
  title,
  blurb,
  bullets,
  books,
  cols = 3,
  isCarousel = false,
}: {
  label: string;
  title: string;
  blurb: string;
  bullets?: string[];
  books: any[];
  cols?: number;
  isCarousel?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          scrollRef.current.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      className="glass-panel p-8 md:p-12 lg:p-16 rounded-3xl w-[95vw] max-w-[1400px] relative left-1/2 -translate-x-1/2"
    >
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2">
          <SeriesLabel>{label}</SeriesLabel>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text pb-4">
            {title}
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">{blurb}</p>
          {bullets && (
            <ul className="space-y-3 text-slate-300">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <Sparkles
                    className="text-[var(--color-brand-purple-light)] flex-shrink-0"
                    size={18}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-3 relative group/carousel">
          {isCarousel && (
            <div className="hidden md:flex absolute -right-4 -top-12 gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 bg-white/5 rounded-full shadow-md hover:bg-white/10 transition-colors border border-white/10 text-slate-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 bg-white/5 rounded-full shadow-md hover:bg-white/10 transition-colors border border-white/10 text-slate-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
          <div
            ref={scrollRef}
            className={
              isCarousel
                ? "grid grid-cols-2 gap-4 md:flex md:overflow-x-auto md:snap-x md:snap-mandatory md:gap-6 md:no-scrollbar md:pb-4 md:-mx-2 md:px-2 md:scroll-smooth"
                : `grid grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4`
            }
          >
            {books.map((b) => (
              <div
                key={b.title}
                className={
                  isCarousel
                    ? "md:flex-shrink-0 md:w-[280px] md:snap-start"
                    : ""
                }
              >
                <BookCard
                  title={b.title}
                  imageUrl={b.imageUrl || undefined}
                  amazonLink={b.amazonLink}
                  buttonText="Get the Book"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [showCover, setShowCover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleScrollToBooks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("books")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero: Mercy In Fire ──────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center px-6 py-20 overflow-hidden">
        {/* Full-bleed cinematic background — the cover art as atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src="/the-mercy-bound-saga-mercy-in-fire.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top opacity-[0.5] scale-110 blur-[2px]"
          />
        </div>
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/60 z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-[var(--background)]/20 z-[3] pointer-events-none" />

        <FloatingParticles count={25} type="embers" />
        <EnergyFlow className="z-[5]" focalY={0.4} />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-brand-pink)]/[0.07] rounded-full blur-[150px] pointer-events-none z-[4]" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-brand-blue)]/10 rounded-full blur-[120px] pointer-events-none z-[4]" />

        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center relative z-20 gap-8 lg:gap-12 pt-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="relative flex justify-center items-center w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px]"
          >
            {/* Pulsing energy rings behind the book */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="energy-ring w-[110%] aspect-square rounded-full border border-cyan-400/20" />
              <div className="energy-ring energy-ring-delay w-[130%] aspect-square rounded-full border border-purple-400/15 absolute" />
              <div className="energy-ring energy-ring-delay-2 w-[150%] aspect-square rounded-full border border-pink-400/10 absolute" />
            </div>
            {/* Ambient glow behind the cover */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-cyan-500/10 via-purple-500/15 to-pink-500/10 rounded-full blur-[80px] animate-pulse pointer-events-none" />
           <div className="book-throb w-full aspect-[3/4] relative">
  <div className="absolute inset-0 -rotate-2 rounded-xl overflow-hidden border border-white/20 shadow-[0_30px_80px_rgba(147,51,234,0.3),0_0_120px_rgba(0,200,200,0.15)] gradient-border group hover:scale-[1.02] hover:-rotate-0 transition-all duration-700 z-10">

    {/* Book Cover — always in flow to maintain frame height */}
    <img
      src="/the-mercy-bound-saga-mercy-in-fire.jpg"
      alt="Mercy In Fire"
      className={`w-full h-full object-cover transition-opacity duration-1000 ${
        showCover ? "opacity-100" : "opacity-0"
      }`}
    />

    {/* Teaser Video — sits on top, fades out when done */}
    <video
      ref={videoRef}
      src="/mercy-in-fire-teaser.mp4"
      autoPlay
      muted
      playsInline
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        showCover ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onEnded={() => setShowCover(true)}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

    {/* Badge Overlay */}
    <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-full flex justify-center z-20 pointer-events-none">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[var(--color-brand-pink)]/30 text-[var(--color-brand-pink-light)] text-xs font-bold tracking-widest uppercase badge-pulse shadow-xl">
        <Flame size={14} /> New Release Coming Soon
      </span>
    </div>
  </div>
</div>
          </motion.div>

          {/* Bottom — Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center max-w-3xl"
          >
            {/* <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 pb-4 leading-tight gradient-text text-glow-fire">
              Mercy In Fire
            </h1>
            <p className="text-lg text-slate-400 mb-3 font-medium">
              The Mercybound Saga
            </p> */}
            <p className="text-slate-500 mb-8 leading-relaxed max-w-lg mx-auto">
              Prepare yourself for Julie Morgan&apos;s most ambitious work yet.
              An epic tale of destiny, sacrifice, and power — where the choices
              made by a few will determine the fate of an entire world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/blog/new-series-and-new-books" className="btn-gradient px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 flex items-center gap-2">
              Learn more <ArrowRight size={18} />
              </Link>
          
              <Link
                href="#books"
                onClick={handleScrollToBooks}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-full font-medium transition-all duration-300"
              >
                Explore All Books
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Brand Intro ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex justify-center mb-8">
              <img
                src="/julie-morgan-logo.png"
                alt="Julie Morgan Books"
                className="w-full max-w-[320px] md:max-w-[420px] h-auto object-contain drop-shadow-[0_0_30px_rgba(147,51,234,0.15)]"
              />
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-medium text-[var(--color-brand-purple-light)] mb-6">
              <Sparkles size={14} /> USA Today Bestselling Author
            </span>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Julie Morgan crafts stories that pull you in from the very first
              page and refuse to let go. From paranormal fantasies to
              swoon-worthy romance and pulse-pounding adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Genres ───────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-6 scroll-mt-28 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand-blue)]/[0.04] rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="gradient-divider mb-20 relative z-10" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Paranormal Fantasy",
                desc: "Epic worlds filled with magic, destiny, and heroes who rise against impossible odds.",
                icon: (
                  <IconParanormalSupernatural className="text-[var(--color-brand-purple-light)] mb-4" />
                ),
              },
              {
                title: "Romance",
                desc: "Swoon-worthy love stories woven through supernatural realms and enchanted lives.",
                icon: (
                  <IconParanormalFantasy className="text-[var(--color-brand-purple-light)] mb-4" />
                ),
              },
              {
                title: "Paranormal & Supernatural",
                desc: "Dark, thrilling worlds where the line between the living and the beyond blurs beautifully.",
                icon: (
                  <IconRomance className="text-[var(--color-brand-purple-light)] mb-4" />
                ),
              },
            ].map((g, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="glass-panel p-8 rounded-2xl hover-glow"
              >
                {g.icon}
                <h3 className="text-xl font-bold mb-3 gradient-text-subtle">
                  {g.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {g.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Speed Dating ─────────────────────────────────────────────────────── */}
      <section id="books" className="py-12 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="A Whimsical Encounter Like No Other"
            title="Speed Dating with the Denizens of the Underworld"
            blurb="What happens when romance meets the supernatural — and nobody plays by the rules? This delightfully offbeat series blends laugh-out-loud humor with the otherworldly."
            bullets={[
              "Charming, witty, and utterly unpredictable",
              "Romance with a side of the uncanny",
              "A supernatural cast you won\u0027t forget",
            ]}
            books={SPEED_DATING}
            isCarousel={true}
          />
        </div>
      </section>

      {/* ── Fairy Tale Retellings ─────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Beloved Classics, Reimagined"
            title="Fairy Tale Retellings"
            blurb="The stories you grew up loving, reimagined with depth, complexity, and a fresh perspective."
            bullets={[
              "The Beast Underneath — Beauty & the Beast",
              "The Huntress — Red Riding Hood",
              "Ella's Prince — Alice in Wonderland",
              "All 3 Books in 1 — Only $0.99!",
            ]}
            books={FAIRY_TALE}
            isCarousel={true}
          />
        </div>
      </section>

      {/* ── Covenant of New Orleans ───────────────────────────────────────────── */}
      <section className="relative w-full py-24 px-6 my-12 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--color-brand-purple)]/[0.06] rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="gradient-divider mb-24 relative z-10" />
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Dark. Seductive. Supernatural."
            title="The Covenant of New Orleans"
            blurb="In the shadowy heart of New Orleans, bloodlines run deep and desire runs darker."
            bullets={[
              "Rich supernatural world-building",
              "Enemies-to-lovers tension",
              "Unforgettable paranormal romance",
            ]}
            books={COVENANT}
            cols={3}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16 max-w-6xl mx-auto"
          >
            <div className="mb-6">
              <SeriesLabel>Spin-off Series</SeriesLabel>
              <h3 className="text-2xl font-bold gradient-text pb-4">
                Blood Chronicles
              </h3>
              <p className="text-slate-500 mt-2">
                The Covenant universe expands — following blood, betrayal, and
                bonds across two cities.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:gap-6">
              {BLOOD_CHRONICLES.map((b) => (
                <div key={b.title} className="lg:w-72">
                  <BookCard
                    title={b.title}
                    imageUrl={b.imageUrl || undefined}
                    amazonLink={b.amazonLink}
                    buttonText="Get the Book"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Alchemy ──────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Magic & Mystery"
            title="The Alchemy Series"
            blurb="A world where magic is science and science is magic — and both can be deadly."
            bullets={[
              "Deadly secrets hidden in plain sight",
              "Magic systems with real consequences",
              "Gripping paranormal suspense",
            ]}
            books={ALCHEMY}
            cols={3}
          />
        </div>
      </section>

      {/* ── Rise of the Alpha ────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-32 pt-8"
          >
            <div className="mb-10 border-b border-white/[0.06] pb-8">
              <SeriesLabel>Paranormal Fantasy</SeriesLabel>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text pb-4">
                Rise of the Alpha Series
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl">
                Thrilling paranormal fantasies where power, pack, and passion
                collide. Four books — one epic journey.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {RISE_ALPHA.map((b) => (
                <BookCard
                  key={b.title}
                  title={b.title}
                  imageUrl={b.imageUrl || undefined}
                  amazonLink={b.amazonLink}
                  buttonText="Get the Book"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Chronicles of the Veil ───────────────────────────────────────────── */}
      <section className="w-full py-24 px-6 my-12">
        <div className="gradient-divider mb-24" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="mb-10 border-b border-white/[0.06] pb-8">
              <SeriesLabel>Magic & Intrigue</SeriesLabel>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text pb-4">
                Chronicles of the Veil
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl">
                Journey through realms of magic and intrigue where the boundary
                between worlds is paper-thin.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {CHRONICLES.map((b) => (
                <BookCard
                  key={b.title}
                  title={b.title}
                  imageUrl={b.imageUrl || undefined}
                  amazonLink={b.amazonLink}
                  buttonText="Get the Book"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Misadventures ──────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Steamy Romance"
            title="Misadventures Series"
            blurb="Escape into stories of passion, risk, and second chances."
            bullets={[
              "Heart-pounding romance",
              "Strong, relatable characters",
              "A series of standalone adventures",
            ]}
            books={MISADVENTURES}
            cols={2}
          />
        </div>
      </section>

      {/* ── Standalones ──────────────────────────────────────────────────────── */}
      <section className="w-full py-24 px-6 my-12">
        <div className="gradient-divider mb-24" />
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Unique Journeys"
            title="Standalone Stories"
            blurb="Discover unique worlds and singular journeys spanning fantasy to contemporary romance."
            bullets={[
              "Dragon Master — An epic fantasy",
              "Stone Obsession — A thrilling romance",
            ]}
            books={STANDALONES}
            cols={2}
          />
        </div>
      </section>

      {/* ── Series Collections ───────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="pt-8"
          >
            <div className="mb-12 max-w-3xl border-b border-white/[0.06] pb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text pb-4">
                Series Collections
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Binge complete universes with Julie Morgan&apos;s curated
                all-in-one volumes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  label: "The Three in One Set",
                  desc: "Three complete stories bound together — perfect for readers who can't stop at just one.",
                  src: "/chronicles-of-the-veil-collection.jpg",
                  title: "The Three in One Set",
                  link: "https://books2read.com/u/3k2758",
                },
              ].map((c) => (
                <div key={c.label}>
                  <h4 className="font-bold text-[var(--color-brand-purple-light)] mb-2">
                    {c.label}
                  </h4>
                  <p className="text-sm text-slate-500 mb-4">{c.desc}</p>
                  <div className="w-48">
                    <BookCard
                      title={c.title}
                      imageUrl={c.src}
                      amazonLink={c.link}
                      buttonText="Get Collection"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-brand-pink)]/[0.08] rounded-full blur-[120px] pointer-events-none z-0" />
        <FloatingParticles count={15} type="sparkles" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="glass-panel p-12 md:p-20 rounded-3xl w-[95vw] max-w-[1400px] relative left-1/2 -translate-x-1/2 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 gradient-text pb-4">
              Find Your Next Favorite Read
            </h2>
            <p className="text-slate-500 mb-10 text-lg">
              Your next obsession is waiting. Browse Julie Morgan&apos;s full
              collection.
            </p>
            <Link
              href="/#books"
              className="px-8 py-4 bg-white/5 hover:bg-[var(--color-brand-purple)] border border-white/10 hover:border-[var(--color-brand-purple)] text-white/80 hover:text-white rounded-full font-medium transition-all duration-300 inline-block"
            >
              Back to Full Collection
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
