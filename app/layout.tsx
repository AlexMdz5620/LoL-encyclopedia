import type { Metadata } from "next";
import "./globals.css";
import { getChampions } from '@/services/champions';
import LoLHydrator from '@/components/utils/LoLHydrator';
import { getItems } from '@/services/items';
import Navbar from '@/components/layout/Navbar';
import { getRunes } from '@/services/runes';
import { getLatestVersion } from '@/lib/ddragon';
import { beaufort, spiegel } from './fonts';

export const metadata: Metadata = {
  title: "La Enciclopedia del Invocador",
  description: "Página web para mostrar la información de los Campeones, Items y Runas del League of Legends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [version, champions, items, runes] = await Promise.all([getLatestVersion(), getChampions(), getItems(), getRunes()]);

  const initialData = { version, champions, items, runes };

  // extractUniqueValues();

  return (
    <html lang="es" className={`${beaufort.variable} ${spiegel.variable}`}>
      <body
        className={`${spiegel.className} antialiased`}
      >
        <LoLHydrator initialData={initialData} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
