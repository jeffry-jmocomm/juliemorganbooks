"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import BookCard from "@/components/BookCard";
import { ArrowRight, Sparkles, BookOpen, Headphones } from "lucide-react";
import Link from "next/link";

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

const IconParanormalFantasy = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="101.42505645751953 -0.018628748133778572 922.200927734375 1024.0186767578125" className={className} overflow="visible"><g fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"><path d="M 611.1,524.78 C 588.48,523.11 561.22,523.24 539.14,525.08 C 517.78,528.8 496.7,534.77 479.58,541.58 C 461.95,550.7 446.42,560.94 431.43,573.4 C 418.47,586.66 406.23,602.4 396.93,617.97 C 390.29,633.02 385.34,648.77 375.58,699.62"></path><path d="M 547.12,65.88 C 507.75,65.87 486.48,68.4 459.41,74.51 C 430.82,85.77 415.01,93.56 401.61,101.25 C 373.79,120.35 349.26,141.04 321.03,169.39"></path><path d="M 547.12,65.88 C 532.0,91.83 524.32,107.36 517.55,126.73 C 514.34,142.36 512.79,157.85 512.7,173.38 C 521.0,255.13 522.17,274.6 521.95,290.17 C 519.95,313.55 516.49,333.08 511.0,352.56 C 502.96,372.32 492.01,391.9 480.33,407.73 C 466.03,422.92 446.12,439.35 426.85,451.38 C 403.25,462.41 390.29,467.08 352.5,476.9"></path><path d="M 352.5,476.9 C 377.6,438.89 385.66,422.82 389.69,411.11 C 393.43,395.5 395.7,379.77 396.54,364.12 C 396.07,348.51 393.89,328.96 390.22,309.53 C 385.22,290.02 378.92,270.49 371.16,250.9 C 361.9,231.44 353.19,215.78 340.85,196.63 C 321.03,169.39 305.02,152.6 290.53,138.32 C 275.15,124.88 259.37,112.75 243.65,102.14 C 224.13,90.85 199.83,78.96 173.1,69.71 C 153.78,64.53 138.35,61.51 102.4,57.93"></path><path d="M 352.5,476.9 C 298.36,475.14 277.24,471.77 258.51,466.7 C 236.02,458.13 216.68,448.25 197.43,435.45 C 180.1,420.61 166.09,405.14 153.93,387.7 C 144.86,370.7 137.63,351.98 132.33,331.09 C 129.51,310.28 128.57,286.54 129.81,261.42"></path><path d="M 991.58,801.67 C 1002.36,787.56 1011.08,772.49 1017.76,756.41 L 1021.79,741.22"></path><path d="M 556.92,815.51 C 544.16,802.33 535.63,791.3 528.76,780.32 C 522.58,767.73 517.82,754.91 514.2,740.27 C 512.34,726.23 512.14,710.86 513.73,695.48 C 517.07,680.73 521.11,669.06 527.48,655.51 C 535.17,642.94 544.45,631.12 555.45,620.18 C 566.44,611.58 578.12,604.38 591.15,598.13 C 603.37,593.83 617.36,590.59 630.96,588.98 C 643.59,588.85 657.49,590.25 669.89,592.94 C 680.9,596.6 691.37,601.43 700.86,607.01 C 712.92,615.54 732.12,632.13 768.1,667.63"></path><path d="M 1021.79,741.22 C 1023.44,730.01 1024.0,718.81 1023.38,703.77 C 1022.06,693.89 1019.41,682.28 1015.22,669.84 C 1011.44,661.16 1004.97,649.44 998.26,639.71 C 990.04,629.95 981.69,621.58 972.26,613.78 C 962.96,607.45 952.63,601.68 932.2,593.68 C 921.89,591.11 910.8,589.44 901.12,588.85 C 887.22,589.28 868.91,592.5 849.79,599.38 C 832.92,608.78 814.03,622.96 799.07,636.6 L 768.1,667.63"></path><path d="M 375.58,699.62 L 449.42,693.13"></path><path d="M 458.1938692751958,75.18920042640214 A 146.7760133072379,146.7760133072379 0 0,0 199.86078555428006,78.97602827189488"></path><path d="M 330.05,481.45 L 329.41,771.76"></path><path d="M 329.73,914.4 L 330.17,701.89"></path><path d="M 375.58,699.62 L 329.81,771.19"></path><path d="M 610.31,526.9 L 611.1,524.78"></path><path d="M 768.83,1024.0 L 991.58,801.67"></path><path d="M 768.83,1024.0 L 556.92,815.51"></path><path d="M 129.81,261.42 L 139.96,161.99"></path><path d="M 140.39779950792783,161.96765226147005 A 180.97373823149857,180.97373823149857 0 0,0 101.42505480844488,58.70361129507555"></path></g></svg>
);

const IconRomance = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="61.3745002746582 8.9378662109375 901.25146484375 1007.1221313476562" fill="none" className={className} overflow="visible"><path d="M745.186 313.304C747.541 356.399 745.718 393.203 741.445 429.964C733.586 466.889 724.658 496.193 712.641 527.858C696.013 557.579 680.861 582.804 667.185 603.536" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M877.733 276.681C827.978 294.414 797.184 303.051 765.335 310.211C724.898 315.808 686.871 320.32 651.254 323.745" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M596.126 326.887L540.958 327.668" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M474.756 327.298C419.547 325.658 368.487 322.139 327.583 318.037C269.14 310.017 232.623 302.743 189.945 292.418L143.005 279.831" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M61.3745 1006.13C61.8141 913.002 62.9621 891.018 65.0845 872.663C68.7618 854.361 74.497 836.086 82.9529 817.85C92.5658 802.971 105.135 788.697 119.302 776.412C133.947 766.473 152.432 756.558 170.756 748.393C183.078 743.669 221.773 730.359 286.842 708.462" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M454.059 440.126C456.072 430.458 459.707 421.34 464.438 413.593C469.655 407.792 476.879 401.945 485.102 397.125C494.259 393.537 502.484 391.672 513.726 390.742C521.063 391.318 532.074 393.933 539.629 397.03C547.216 401.418 554.7 407.425 561.194 414.525C566.083 422.002 570.839 433.4 572.881 444.62C572.917 452.126 571.895 459.639 568.229 471.157C561.945 482.228 556.002 489.666 533.623 511.006C524.164 522.077 517.765 533.392 513.236 549.199" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M667.185 603.536C645.17 629.522 631.438 644.024 612.634 660.041C593.707 672.936 576.899 681.613 555.617 689.133C533.151 693.673 512.762 694.937 489.857 693.331C470.913 689.532 449.209 682.081 429.784 672.411C409.635 658.577 393.312 644.728 379.763 630.874L357.728 604.941" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M357.728 604.941C348.135 591.925 335.781 572.246 325.227 553.427C312.956 529.073 302.66 503.938 289.004 459.959C282.491 426.928 278.575 391.773 276.816 358.615L277.945 311.106" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M701.646 54.1977C695.559 35.8808 688.253 22.9012 679.86 15.0575C669.399 10.0645 656.198 7.93808 641.211 9.49293C626.664 12.7601 611.857 16.733 596.79 21.4118" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M596.79 21.4118C541.068 39.557 524.398 42.9228 511.031 43.784C496.42 42.2579 482.317 38.9825 404.391 13.9174" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M404.391 13.9173C387.647 9.86397 371.27 7.94695 358.47 9.44525C347.993 14.1257 340.188 20.608 334.35 29.0789C330.855 36.7906 326.7 48.007 321.885 62.728" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M854.682 749.645C879.681 761.112 901.017 773.547 917.609 786.609C924.795 793.9 932.488 803.274 939.475 813.869C944.282 822.792 949.344 834.366 953.701 846.958C957.588 864.354 960.437 882.367 962.248 900.995" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M962.467 974.552L962.626 1006.34" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M830.253 617.859L712.641 527.858" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M830.253 617.859L692.327 755.546" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M738.124 809.661L692.327 755.546" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M738.124 809.661L512.387 1016.06" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M512.387 1016.06L285.209 809.489" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M332.601 755.144L285.209 809.489" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M332.601 755.144L196.148 616.747" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M312.956 529.073L196.148 616.747" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M740.303 209.39L285.091 210.049" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M746.161 233.355L740.303 209.39" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M877.733 276.681L746.161 233.355" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M278.511 235.553L143.005 279.831" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M651.254 323.745L596.126 326.887" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M746.161 233.355L701.646 54.1976" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M540.958 327.668L474.756 327.298" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M739.255 709.018L854.682 749.645" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M962.247 900.995L962.467 974.552" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><path d="M321.885 62.728L278.511 235.553" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="512" cy="613" r="3.97" fill="currentColor" stroke="currentColor" strokeWidth="45"></circle></svg>
);

const IconParanormalSupernatural = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="4 5.955999851226807 1016.3006591796875 1012.0880126953125" className={className} overflow="visible"><g fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round"><path d="M 371.243,5.956 C 276.65,87.592 212.147,140.767 200.548,149.179"></path><path d="M 267.235,275.565 C 276.201,296.351 279.956,309.034 280.479,323.105 C 276.908,337.548 271.831,347.41 261.013,361.463 C 220.936,402.411 196.753,429.77 179.321,452.707 C 167.57,470.855 150.747,503.026 141.708,526.121 C 137.566,539.827 133.454,557.889 130.112,585.289 C 130.462,612.766 132.094,626.512 134.755,640.177 C 141.925,663.389 147.767,677.181 154.714,690.7 C 169.854,714.098 189.005,736.87 211.46,757.73 L 239.522,778.939"></path><path d="M 239.284,961.555 C 161.191,962.745 142.836,963.936 133.624,966.345 C 129.1,968.656 121.776,974.228 112.316,983.467"></path><path d="M 600.002,892.878 C 546.216,874.627 528.43,865.908 513.994,856.979 C 500.602,845.758 490.532,834.423 481.845,820.74 L 473.813,802.515"></path><path d="M 787.0,433.446 C 713.814,474.096 695.609,485.234 677.428,497.735 C 658.833,511.387 640.254,526.672 591.787,572.005"></path><path d="M 402.41,385.876 C 410.07,362.816 414.583,344.346 417.364,325.798 C 418.253,307.387 417.425,288.978 414.432,270.192 C 409.678,253.123 402.638,235.494 394.503,220.514 C 384.154,205.731 371.488,191.839 359.553,181.623 C 348.2,173.929 333.687,166.495 292.695,151.879"></path><path d="M 819.203,786.274 C 781.606,724.054 762.997,695.747 742.387,668.97 C 720.958,646.356 709.321,635.975 698.901,627.924 C 679.369,614.4 662.662,604.118 626.176,585.274 L 591.787,572.005"></path><path d="M 4.023,331.001 L 4.0,255.195"></path><path d="M 267.235,275.565 L 4.023,331.001"></path><path d="M 239.522,778.939 L 239.284,961.555"></path><path d="M 112.316,983.467 L 111.21,1018.013"></path><path d="M 268.418,1018.044 L 111.21,1018.013"></path><path d="M 358.054,804.061 L 268.418,1018.044"></path><path d="M 473.813,802.515 L 358.054,804.061"></path><path d="M 600.002,892.878 L 566.719,988.839"></path><path d="M 566.719,988.839 L 492.343,991.46"></path><path d="M 486.272,1017.742 L 492.343,991.46"></path><path d="M 493.38156738755936,720.8898739239839 A 89.22303421414178,89.22303421414178 0 0,0 474.2526560125565,802.3990527128774"></path><path d="M 371.243,5.956 L 292.695,151.879"></path><path d="M 342.81,530.766 L 402.41,385.876"></path><path d="M 491.73048089733794,337.2917711632081 A 194.39044151491592,194.39044151491592 0 0,1 342.5385325618711,529.6297364089043"></path><path d="M 493.144,337.268 L 847.289,129.258"></path><path d="M 847.289,129.258 L 739.975,337.927"></path><path d="M 787.0,433.446 L 739.975,337.927"></path><path d="M 200.548,149.179 L 4.0,255.195"></path><path d="M 1019.6851851547433,967.9386239707978 A 413.2522050057024,413.2522050057024 0 0,1 820.130787677617,785.7697088553216"></path><path d="M 636.906,779.879 L 791.617,916.721"></path><path d="M 792.7067780704512,915.4793035850196 A 247.21063050822835,247.21063050822835 0 0,0 1020.3006286972309,968.3198438891086"></path></g></svg>
);

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#books") {
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
      }, 100);
    }
  }, []);

  const handleScrollToBooks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("books")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand-blue)]/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-brand-purple)]/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex justify-center mb-8">
              <img
                src="/julie-morgan-logo.png"
                alt="Julie Morgan Books"
                className="w-full max-w-[320px] md:max-w-[450px] h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-medium text-[var(--color-brand-blue)] mb-6">
              <Sparkles size={14} /> USA Today Bestselling Author
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              Discover Worlds <br /> Beyond Imagination
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Julie Morgan crafts stories that pull you in from the very first
              page and refuse to let go. From paranormal fantasies to
              swoon-worthy romance and pulse-pounding adventure, her universes
              are rich, layered, and utterly unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#books"
                onClick={handleScrollToBooks}
                className="px-8 py-4 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] rounded-full text-white font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2"
              >
                Explore the Books <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Genres Section */}
      <section className="py-20 px-6 border-y border-white/5 bg-black/20">
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
                icon: <IconParanormalSupernatural className="text-[var(--color-brand-blue)] mb-4" />
              },
              {
                title: "Romance",
                desc: "Swoon-worthy love stories woven through supernatural realms and enchanted lives.",
                icon: <IconParanormalFantasy className="text-[var(--color-brand-blue)] mb-4" />
              },
              {
                title: "Paranormal & Supernatural",
                desc: "Dark, thrilling worlds where the line between the living and the beyond blurs beautifully.",
                icon: <IconRomance className="text-[var(--color-brand-blue)] mb-4" />
              },
            ].map((genre, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="glass-panel p-8 rounded-2xl"
              >
                {genre.icon}
                <h3 className="text-xl font-bold mb-3">{genre.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {genre.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Spotlight */}
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
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The Mercybound Saga: Mercy In Fire
                </h2>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Prepare yourself for Julie Morgan's most ambitious work yet.
                  The Mercybound Saga is an epic tale of destiny, sacrifice, and
                  power — where the choices made by a few will determine the
                  fate of an entire world. Ancient forces are stirring,
                  alliances will be tested, and no one will emerge unchanged.
                </p>
                <p className="text-slate-400 mb-8 italic">
                  This sweeping saga promises rich world-building, unforgettable
                  characters, and a story that will leave you breathless. Add it
                  to your reading list now and be the first to know when it
                  arrives.
                </p>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-colors">
                  Join the Waitlist
                </button>
              </div>
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto shadow-2xl rounded-xl overflow-hidden shadow-[var(--color-brand-purple)]/30 border border-white/10 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-500">
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

      {/* Featured Book Sections */}
      <section id="books" className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          {/* Speed Dating Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Featured Series Details */}
            <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center mb-16 relative">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-brand-blue)]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

              <div className="md:col-span-2 relative aspect-[3/4] w-full max-w-sm lg:max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden shadow-[var(--color-brand-blue)]/20 border border-white/10 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500">
                <img
                  src="/speed-dating-the-denizens-samael.jpg"
                  alt="Speed Dating with the Denizens: Samael"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-3">
                <div className="mb-8 border-b border-white/5 pb-8">
                  <span className="inline-block px-3 py-1 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] text-xs font-bold tracking-widest uppercase rounded mb-4">
                    A Whimsical Encounter Like No Other
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Speed Dating with the Denizens of the Underworld
                  </h2>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  What happens when romance meets the supernatural — and nobody
                  plays by the rules? This delightfully offbeat story blends
                  laugh-out-loud humor with the otherworldly, dropping you into
                  a speed dating event unlike anything you've imagined.
                </p>
                <p className="text-slate-400 mb-8 italic">
                  Charming, witty, and utterly unpredictable, it's the perfect
                  read for anyone who likes their romance with a side of the
                  uncanny.
                </p>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-colors">
                  Read more
                </button>
              </div>
            </div>

            {/* Other Books in Series */}
            <div className="inline-block px-3 py-1 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] text-xs font-bold tracking-widest uppercase rounded mb-4">
              More in the series
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <BookCard
                title="Hells Belle"
                imageUrl="/speed-dating-the-denizens-hells-belle.jpg"
                buttonText="Start Reading"
              />
              <BookCard
                title="Cassiel"
                imageUrl="/speed-dating-the-denizens-cassiel.jpg"
                buttonText="Start Reading"
              />
              <BookCard
                title="Alastor"
                imageUrl="/speed-dating-the-denizens-alastor.jpg"
                buttonText="Start Reading"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Covenant of New Orleans - Full Width Glass Panel */}
      <section className="w-full glass-panel border-y border-white/5 py-40 px-6 my-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                The Covenant of New Orleans Series
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
              <BookCard
                title="The Concubine and Her Vampires"
                imageUrl="/the-covenant-of-new-orleans-the-concubine-and-her-vampires.jpg"
              />
              <BookCard
                title="The Demon and Her Vampires"
                imageUrl="/the-covenant-of-new-orleans-the-demon-and-her-vampires.jpg"
              />
              <BookCard
                title="The Human and Her Vampires"
                imageUrl="/the-covenant-of-new-orleans-the-human-and-her-vampires.jpg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          {/* The Alchemy Series */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-32 pt-16"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-white/5 pb-12">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] text-xs font-bold tracking-widest uppercase rounded mb-4">
                  Magic & Mystery
                </span>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  The Alchemy Series
                </h2>
              </div>
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-colors whitespace-nowrap self-start md:self-auto">
                Explore Series
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              <BookCard
                title="Deadly Alchemy"
                imageUrl="/the-alchemy-series-deadly-alchemy.jpg"
              />
              <BookCard
                title="Fatal Alchemy"
                imageUrl="/the-alchemy-series-fatal-alchemy.jpeg"
              />
              <BookCard
                title="Wicked Alchemy"
                imageUrl="/the-alchemy-series-wicked-alchemy.jpg"
              />
            </div>
          </motion.div>

          {/* Fairytale Retellings */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="glass-panel p-8 md:p-12 lg:p-16 rounded-3xl w-[95vw] max-w-[1400px] relative left-1/2 -translate-x-1/2"
          >
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Fairytale Retellings
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  The stories you grew up loving, reimagined with depth,
                  complexity, and a fresh perspective. Julie Morgan breathes new
                  life into beloved classics, honoring their timeless magic
                  while reinventing them for a new generation of readers.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Sparkles
                      className="text-[var(--color-brand-blue)] flex-shrink-0"
                      size={20}
                    />{" "}
                    <span>
                      <strong>Familiar Worlds:</strong> Stories rooted in the
                      fairy tales you know and love, now richer.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Sparkles
                      className="text-[var(--color-brand-blue)] flex-shrink-0"
                      size={20}
                    />{" "}
                    <span>
                      <strong>Bold Heroines:</strong> Characters reimagined with
                      agency, strength, and depth.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Sparkles
                      className="text-[var(--color-brand-blue)] flex-shrink-0"
                      size={20}
                    />{" "}
                    <span>
                      <strong>Unexpected Twists:</strong> Familiar stories that
                      surprise you and challenge you.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <BookCard
                  title="Ella's Prince"
                  imageUrl="/the-fairytale-retellings-ellas-prince.jpg"
                />
                <BookCard
                  title="The Beast Underneath"
                  imageUrl="/the-fairytale-retellings-the-beast-underneath.jpg"
                />
                <BookCard
                  title="The Huntress"
                  imageUrl="/the-fairytale-retellings-the-huntress.jpg"
                />
              </div>
            </div>
          </motion.div>

          {/* Series Collections */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-32 pt-16"
          >
            <div className="mb-16 max-w-3xl border-b border-white/5 pb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Series Collections: Dive Deeper into Beloved Worlds
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Whether you're a devoted fan ready to binge an entire universe
                or a newcomer looking for the perfect entry point, Julie
                Morgan's curated collections have you covered.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              <div className="">
                <h4 className="font-bold text-[var(--color-brand-blue)] mb-2">
                  The Three in One Set
                </h4>
                <p className="text-sm text-slate-400 mb-6">
                  Three complete stories bound together — perfect for readers
                  who can't stop at just one.
                </p>
                <div className="w-48 ">
                  <BookCard title="The Three in One Set" imageUrl="/the-three-in-one-set.png" buttonText="Get Collection" />
                </div>
              </div>
              <div className="">
                <h4 className="font-bold text-[var(--color-brand-blue)] mb-2">
                  Rise of the Alpha Series
                </h4>
                <p className="text-sm text-slate-400 mb-6">
                  Thrilling paranormal fantasies where power, pack and passion
                  collide in spectacular fashion.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <BookCard title="Alpha Rising" imageUrl="/rise-of-the-alpha-series-alpha-rising.jpg" />
                  <BookCard title="Alpha Risen" imageUrl="/rise-of-the-alpha-series-alpha-risen.jpg" />
                </div>
              </div>
              <div className="">
                <h4 className="font-bold text-[var(--color-brand-blue)] mb-2">
                  Chronicles of the Veil
                </h4>
                <p className="text-sm text-slate-400 mb-6">
                  Journey through realms of magic and intrigue where the
                  boundary between worlds is paper-thin.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <BookCard title="The Sassy Queen" imageUrl="/chronicles-of-the-veil-series-the-sassy-queen.jpeg" />
                  <BookCard title="The Sassy Goddess" imageUrl="/chronicles-of-the-veil-series-the-sassy-goddess.jpg" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audiobooks Banner */}
      <section className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="glass-panel p-12 md:p-20 rounded-3xl w-[95vw] max-w-[1400px] relative left-1/2 -translate-x-1/2"
        >
          <div className="max-w-4xl mx-auto text-center">
            <Headphones
              size={48}
              className="mx-auto text-[var(--color-brand-purple)] mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Listen Anywhere, Anytime
            </h2>
            <h3 className="text-xl text-[var(--color-brand-purple)] mb-6">
              Experience the Stories in Audio
            </h3>
            <p className="text-slate-300 leading-relaxed mb-8">
              Can't put the book down — even when life gets in the way? Take
              Julie Morgan's worlds with you wherever you go. From morning
              commutes to evening walks, her audiobooks deliver the same rich
              storytelling, now in immersive audio form narrated to bring every
              character vividly to life.
            </p>
            <Link 
              href="/audiobooks"
              className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors"
            >
              Browse Audiobooks
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CTA / Final Section */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--color-brand-blue)] to-white bg-clip-text text-transparent">
              Find Your Next Favorite Read
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Your next obsession is waiting. Browse Julie Morgan's full
              collection of fantasy, romance, paranormal, and adventure titles —
              and discover the story that was written just for you.
            </p>
            <Link
              href="#books"
              onClick={handleScrollToBooks}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-medium transition-colors"
            >
              Back to Full Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
