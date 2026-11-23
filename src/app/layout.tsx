import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Mono and serif are only used by the /samples concepts.

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Elixiray — Tech Sales Consulting",
  description:
    "Elixiray turns bold technology ideas into shipped products and predictable revenue — idea formulation, implementation and sales, under one roof.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${jakarta.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <head>
        {/* Apply a saved theme before first paint so dark-mode visitors never see a light flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="grain min-h-full flex flex-col">{children}</body>
    </html>
  );
}
