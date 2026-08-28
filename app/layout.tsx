import type { Metadata } from "next";
import { Fredoka, Baloo_2 } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeScript } from "@/components/ThemeScript";
import { ThemeSettings } from "@/components/ThemeSettings";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
});
const baloo = Baloo_2({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Capstone",
  description: "Frontend AI Engineering Capstone",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fredoka.variable} ${baloo.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 p-4 border-b border-border bg-card">
            <Link href="/" className="rounded px-1 py-1 hover:text-accent">Home</Link>
            <Link href="/about" className="rounded px-1 py-1 hover:text-accent">About</Link>
            <Link href="/dashboard" className="rounded px-1 py-1 hover:text-accent">Dashboard</Link>
            <Link href="/settings" className="rounded px-1 py-1 hover:text-accent">Settings</Link>
            <Link href="/health" className="rounded px-1 py-1 hover:text-accent">Health</Link>
          </nav>
          <main className="p-4 flex-1">{children}</main>
          <ThemeSettings />
        </ThemeProvider>
      </body>
    </html>
  );
}