import React from 'react';
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Image from 'next/image';
import KostioLogo from "../assets/kostio-logo.png";
import Link from "next/link";
import FooterMenu from "@/components/FooterMenu";
import type { Viewport } from 'next';
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Kostio - Se hvor mye bilen egentlig koster!",
  description: "Se hvor mye bilen egentlig koster!",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}><Image src={KostioLogo} alt="Kostio Logo" width={32} /></Link>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl w-full p-3">
                {children}
              </div>

              <footer className="w-full flex justify-center">
                <FooterMenu className={`fixed bottom-0 w-full transition-transform duration-500`}/>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
