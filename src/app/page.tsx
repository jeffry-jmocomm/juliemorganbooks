"use client";

import { motion } from "framer-motion";
import BookCard from "@/components/BookCard";
import {
  IconParanormalFantasy,
  IconRomance,
  IconParanormalSupernatural,
} from "@/components/GenreIcons";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
    title: "The Concubine",
    imageUrl: "/the-covenant-of-new-orleans-the-concubine-and-her-vampires.jpg",
    amazonLink: "https://books2read.com/u/3J1Erv",
  },
  {
    title: "Human",
    imageUrl: "/the-covenant-of-new-orleans-the-human-and-her-vampires.jpg",
    amazonLink: "http://www.books2read.com/humanv",
  },
  {
    title: "The Demon",
    imageUrl: "/the-covenant-of-new-orleans-the-demon-and-her-vampires.jpg",
    amazonLink: "https://books2read.com/u/mgJ7qX",
  },
];

const BLOOD_CHRONICLES = [
  {
    title: "Blood Chronicles: New Orleans",
    imageUrl: "",
    amazonLink: "https://www.juliemorganbooks.com/",
  },
  {
    title: "Blood Chronicles: Paris",
    imageUrl: "",
    amazonLink: "https://www.juliemorganbooks.com/",
  },
];

const FAIRY_TALE = [
  {
    title: "The Beast Underneath",
    subTitle: "Beauty & the Beast",
    imageUrl: "/the-fairytale-retellings-the-beast-underneath.jpg",
    amazonLink:
      "https://www.amazon.com/Beast-Underneath-Fairytale-Chronicles-Book-ebook",
  },
  {
    title: "The Huntress",
    subTitle: "Red Riding Hood",
    imageUrl: "/the-fairytale-retellings-the-huntress.jpg",
    amazonLink: "https://www.amazon.com/gp/product/B07HGMLB4N",
  },
  {
    title: "Ellis Princess",
    subTitle: "Alice in Wonderland",
    imageUrl: "/ellas-prince.jpg",
    amazonLink: "https://amzn.to/37TLzGS",
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
    amazonLink: "http://books2read.com/alphereedem1",
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
    amazonLink: "https://magicandmayhemuniverse.com/julie-morgan/ ",
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
    <span className="inline-block px-3 py-1 bg-[var(--color-brand-purple)]/10 text-[var(--color-brand-purple)] text-xs font-bold tracking-widest uppercase rounded mb-4">
      {children}
    </span>
  );
}

/** Blurb on left (2 cols) + book grid on right (3 cols) */
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
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
            {title}
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">{blurb}</p>
          {bullets && (
            <ul className="space-y-3 text-slate-700">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <Sparkles
                    className="text-[var(--color-brand-purple)] flex-shrink-0"
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
                className="p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors border border-black/5 text-slate-600"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors border border-black/5 text-slate-600"
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
                : `grid grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4`
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
                  key={b.title}
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
  const handleScrollToBooks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("books")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand-purple)]/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-brand-purple)]/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex justify-center mb-8">
              <img
                src="/julie-morgan-logo.png"
                alt="Julie Morgan Books"
                className="w-full max-w-[320px] md:max-w-[450px] h-auto object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
              />
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-medium text-[var(--color-brand-purple)] mb-6">
              <Sparkles size={14} /> USA Today Bestselling Author
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight pb-2 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">
              Discover Worlds <br /> Beyond Imagination
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Julie Morgan crafts stories that pull you in from the very first
              page and refuse to let go. From paranormal fantasies to
              swoon-worthy romance and pulse-pounding adventure, her universes
              are rich, layered, and utterly unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#books"
                onClick={handleScrollToBooks}
                className="px-8 py-4 bg-gradient-to-r from-[var(--color-brand-purple)] to-[var(--color-brand-purple)] rounded-full text-white font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2"
              >
                Explore the Books <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Genres ───────────────────────────────────────────────────────────── */}
      <section
        id="books"
        className="py-20 px-6 border-y border-black/5 bg-white scroll-mt-28"
      >
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
                  <IconParanormalSupernatural className="text-[var(--color-brand-purple)] mb-4" />
                ),
              },
              {
                title: "Romance",
                desc: "Swoon-worthy love stories woven through supernatural realms and enchanted lives.",
                icon: (
                  <IconParanormalFantasy className="text-[var(--color-brand-purple)] mb-4" />
                ),
              },
              {
                title: "Paranormal & Supernatural",
                desc: "Dark, thrilling worlds where the line between the living and the beyond blurs beautifully.",
                icon: (
                  <IconRomance className="text-[var(--color-brand-purple)] mb-4" />
                ),
              },
            ].map((g, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="glass-panel p-8 rounded-2xl"
              >
                {g.icon}
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  {g.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {g.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mercy Bound Saga (Coming Soon) ───────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="glass-panel rounded-3xl p-8 md:p-12 border border-[var(--color-brand-purple)]/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-brand-purple)]/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-[var(--color-brand-purple)]/20 text-[var(--color-brand-purple)] text-xs font-bold tracking-widest uppercase rounded mb-4">
                  Coming Soon
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800">
                  The Mercybound Saga: Mercy In Fire
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Prepare yourself for Julie Morgan&apos;s most ambitious work
                  yet. The Mercybound Saga is an epic tale of destiny,
                  sacrifice, and power — where the choices made by a few will
                  determine the fate of an entire world.
                </p>
                <p className="text-slate-500 mb-8 italic">
                  Ancient forces are stirring, alliances will be tested, and no
                  one will emerge unchanged. Add it to your reading list now.
                </p>
                <button className="px-6 py-3 bg-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/90 text-white rounded-lg font-medium transition-colors">
                  Pre-order Now
                </button>
              </div>
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto shadow-2xl rounded-xl overflow-hidden border border-white/10">
                <img
                  src="/the-mercy-bound-saga-mercy-in-fire.png"
                  alt="The Mercybound Saga: Mercy In Fire"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Speed Dating ─────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="A Whimsical Encounter Like No Other"
            title="Speed Dating with the Denizens of the Underworld"
            blurb="What happens when romance meets the supernatural — and nobody plays by the rules? This delightfully offbeat series blends laugh-out-loud humor with the otherworldly, dropping you into a speed dating event unlike anything you've imagined."
            bullets={[
              "Charming, witty, and utterly unpredictable",
              "Romance with a side of the uncanny",
              "A supernatural cast you won&apos;t forget",
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
            blurb="The stories you grew up loving, reimagined with depth, complexity, and a fresh perspective. Each retelling honors its source while reinventing it for a new generation — from Beauty and the Beast to Red Riding Hood to Alice in Wonderland."
            bullets={[
              "The Beast Underneath — Beauty & the Beast",
              "The Huntress — Red Riding Hood",
              "Ellis Princess — Alice in Wonderland",
            ]}
            books={FAIRY_TALE}
            cols={3}
          />
        </div>
      </section>

      {/* ── Covenant of New Orleans ───────────────────────────────────────────── */}
      <section className="w-full glass-panel border-y border-black/5 py-24 px-6 my-12">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Dark. Seductive. Supernatural."
            title="The Covenant of New Orleans"
            blurb="In the shadowy heart of New Orleans, bloodlines run deep and desire runs darker. A world of vampires, secrets, and impossible alliances where every choice carries an eternal price."
            bullets={[
              "Rich supernatural world-building",
              "Enemies-to-lovers tension",
              "Unforgettable paranormal romance",
            ]}
            books={COVENANT}
            cols={3}
          />
          {/* Blood Chronicles spin-offs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16 max-w-6xl mx-auto"
          >
            <div className="mb-6">
              <SeriesLabel>Spin-off Series</SeriesLabel>
              <h3 className="text-2xl font-bold text-slate-800">
                Blood Chronicles
              </h3>
              <p className="text-slate-600 mt-2">
                The Covenant universe expands — following blood, betrayal, and
                bonds across two cities.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:gap-6">
              {BLOOD_CHRONICLES.map((b) => (
                <div key={b.title} className="lg:w-72">
                  <BookCard
                    key={b.title}
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
            blurb="A world where magic is science and science is magic — and both can be deadly. The Alchemy series weaves intrigue, power, and paranormal thrills into an addictive blend you won't be able to put down."
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
            <div className="mb-10 border-b border-black/5 pb-8">
              <SeriesLabel>Paranormal Fantasy</SeriesLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
                Rise of the Alpha Series
              </h2>
              <p className="text-slate-600 mt-4 max-w-2xl">
                Thrilling paranormal fantasies where power, pack, and passion
                collide in spectacular fashion. Four books — one epic journey.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
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
      <section className="w-full glass-panel border-y border-black/5 py-24 px-6 my-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="mb-10 border-b border-black/5 pb-8">
              <SeriesLabel>Magic & Intrigue</SeriesLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
                Chronicles of the Veil
              </h2>
              <p className="text-slate-600 mt-4 max-w-2xl">
                Journey through realms of magic and intrigue where the boundary
                between worlds is paper-thin and nothing is what it seems.
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

      {/* ── Misadventures Series ──────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Steamy Romance"
            title="Misadventures Series"
            blurb="Escape into stories of passion, risk, and second chances. The Misadventures series features heroes who will do anything for the women they love."
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
      <section className="w-full glass-panel border-y border-black/5 py-24 px-6 my-12">
        <div className="max-w-6xl mx-auto">
          <SeriesWithBlurb
            label="Unique Journeys"
            title="Standalone Stories"
            blurb="Discover unique worlds and singular journeys. These standalone titles offer complete experiences that span across genres from fantasy to contemporary romance."
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
            <div className="mb-12 max-w-3xl border-b border-black/5 pb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
                Series Collections
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Binge complete universes with Julie Morgan&apos;s curated
                all-in-one volumes — the perfect way to experience entire series
                in one beautiful set.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  label: "The Three in One Set",
                  desc: "Three complete stories bound together — perfect for readers who can't stop at just one.",
                  src: "/the-three-in-one-set.png",
                  title: "The Three in One Set",
                  link: "https://www.amazon.com/dp/B08Q8NNVKJ/",
                },
                {
                  label: "Rise of the Alpha Collection",
                  desc: "The full Rise of the Alpha series in one volume — power, pack, and passion.",
                  src: "/rise-of-the-alpha-series-alpha-rising.jpg",
                  title: "Rise of the Alpha Collection",
                },
                {
                  label: "Covenant of New Orleans Collection",
                  desc: "All three Covenant books in one unforgettable set.",
                  src: "/the-covenant-of-new-orleans-the-concubine-and-her-vampires.jpg",
                  title: "Covenant Collection",
                },
              ].map((c) => (
                <div key={c.label}>
                  <h4 className="font-bold text-[var(--color-brand-purple)] mb-2">
                    {c.label}
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">{c.desc}</p>
                  <div className="w-48">
                    <BookCard
                      title={c.title}
                      imageUrl={c.src}
                      amazonLink="https://www.juliemorganbooks.com/"
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
      <section className="py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="glass-panel p-12 md:p-20 rounded-3xl w-[95vw] max-w-[1400px] relative left-1/2 -translate-x-1/2 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--color-brand-purple)] to-slate-800 bg-clip-text text-transparent">
              Find Your Next Favorite Read
            </h2>
            <p className="text-slate-600 mb-10 text-lg">
              Your next obsession is waiting. Browse Julie Morgan&apos;s full
              collection of fantasy, romance, paranormal, and adventure titles.
            </p>
            <Link
              href="#books"
              onClick={handleScrollToBooks}
              className="px-8 py-4 bg-black/5 hover:bg-black/10 border border-black/10 text-slate-800 rounded-full font-medium transition-colors"
            >
              Back to Full Collection
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
