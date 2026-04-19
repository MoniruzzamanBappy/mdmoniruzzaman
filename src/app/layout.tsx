import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Md. Moniruzzaman Bappy",
  description: "Md. Moniruzzaman Bappy",
  generator: "Md. Moniruzzaman Bappy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} font-(family-name:--font-inter) antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
