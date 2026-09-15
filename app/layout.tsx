import type { Metadata } from "next";
import { Poppins, Contrail_One } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Contrail_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Planificador de Proyecto Solar — Mega Energías",
  description:
    "Dimensiona tu sistema solar Victron: paneles, baterías de litio e inversor MultiPlus-II.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="min-h-screen text-brand-950 antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
