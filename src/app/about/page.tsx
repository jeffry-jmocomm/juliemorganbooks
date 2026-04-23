import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata = {
  title: "About Me | Julie Morgan Books",
  description:
    "About USA TODAY and Award-winning Bestselling Author, Julie Morgan.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tighter text-center">
          About the Author
        </h1>

        <div className="glass-panel p-8 md:p-12 rounded-3xl grid md:grid-cols-5 gap-12 items-center">
          {/* Author Image */}
          <div className="md:col-span-2 relative aspect-[3/4] w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <img
              src="/author-image.jpg"
              alt="Julie Morgan"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Author Bio */}
          <div className="md:col-span-3 space-y-6 text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white text-lg">
                USA TODAY and Award-winning Bestselling Author, Julie Morgan,
              </strong>{" "}
              holds a degree in Computer Science and loves science fiction shows
              and movies.
            </p>
            <p>
              Encouraged by her family, she began writing. Originally from
              Texas, Julie now resides in Central Florida with her husband and
              daughter where she is an advocate for Special Needs children and
              can be found playing games with her daughter when she isn&apos;t
              lost in another world.
            </p>

            <div className="pt-6 mt-6 border-t border-white/10">
              <p className="text-sm text-slate-400 mb-4">
                Julie is represented by{" "}
                <strong className="text-white">JMO Communications</strong>.
                <br />
                For more information please visit JMO at{" "}
                <a
                  href="https://jmocomm.com"
                  className="text-[var(--color-brand-blue)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jmocomm.com
                </a>
              </p>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://facebook.com/juliemorganbook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-full hover:bg-[var(--color-brand-blue)] hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
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
                  className="p-2 bg-white/5 rounded-full hover:bg-[var(--color-brand-purple)] hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
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
                  href="mailto:julie@juliemorganbooks.com"
                  className="p-2 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Logo Footer inside Card */}
          <div className="md:col-span-5 pt-10 mt-2  flex justify-center">
            <img
              src="/julie-morgan-logo.png"
              alt="Julie Morgan Books"
              className="w-full max-w-2xl h-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#books"
            className="inline-flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-medium transition-colors"
          >
            Explore Her Books
          </Link>
        </div>
      </div>
    </div>
  );
}
