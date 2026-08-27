import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Julie Morgan - USA Today Bestselling Author",
  description:
    "Official website of USA TODAY Bestselling Author Julie Morgan. Explore paranormal fantasy, dark romance, and supernatural adventure books.",
  openGraph: {
    title: "Julie Morgan - USA Today Bestselling Author",
    description: "Official website of USA TODAY Bestselling Author Julie Morgan. Explore paranormal fantasy, dark romance, and supernatural adventure books.",
    url: "https://www.juliemorganbooks.com/",
    siteName: "Julie Morgan Books",
    images: [
      {
        url: "https://www.juliemorganbooks.com/julie-morgan-logo.png",
        width: 1200,
        height: 630,
        alt: "Julie Morgan Books Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased scroll-smooth`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
