import type { Metadata } from "next";
import { Fredoka, Baloo_2 } from "next/font/google";
import { NavBar } from "@/components/NavBar";
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
          <NavBar />
          <main className="p-4 flex-1">{children}</main>
          <ThemeSettings />
        </ThemeProvider>
      </body>
    </html>
  );
}