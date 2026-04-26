import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "System Design — The Complete Reference",
  description: "Interactive system design playground, prebuilt architectures, and comprehensive reference.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
