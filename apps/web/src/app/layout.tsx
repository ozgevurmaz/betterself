import { ThemeToggle } from "@/components/preferences/theme";
import "./globals.css";
import { setLocale } from "i18n";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = { title: "BetterSelf" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  setLocale("en");
  return (
    <html lang="en">
      <body>
        <div className="h-screen overflow-hidden">
        <Navbar />
        
          {children}
        </div>
      </body>
    </html>
  );
}
