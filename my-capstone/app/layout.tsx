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
      className={`${fredoka.variable} ${baloo.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <nav className="flex gap-4 p-4 border-b border-border bg-card">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
            <Link href="/health">Health</Link>
          </nav>
          <main className="p-4 flex-1">{children}</main>
          <ThemeSettings />
        </ThemeProvider>
      </body>
    </html>
  );
}