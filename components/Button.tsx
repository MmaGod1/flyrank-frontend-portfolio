import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "children">;

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  primary: "bg-accent-strong text-accent-ink hover:opacity-90",
  secondary:
    "border border-border bg-card text-foreground hover:border-accent",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}