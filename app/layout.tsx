import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";

export const metadata: Metadata = {
  title: "Calculadora Mega Energías",
  description:
    "Dimensiona tu sistema solar Victron: paneles, baterías de litio e inversor MultiPlus-II.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen text-brand-950 antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
