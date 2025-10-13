import "./globals.css";
import { setLocale } from "i18n";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "BetterSelf" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  setLocale("en");
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
