"use client";

import { useLoLStore } from '@/stores';
import { Suspense, useMemo, useState } from 'react';
import SearchBar from '../layout/SearchBar';
import ChampionCard from './ChampionCard';

export default function SectionChampion() {
  const { champions } = useLoLStore();
  const [searchQuery, setSearchQuery] = useState('');

  const normalizeText = (text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredChampions = useMemo(() => {
    if (!searchQuery.trim()) return champions;

    const normalizedQuery = normalizeText(searchQuery);

    return champions.filter(champion => {
      // Normaliza los campos donde quieres buscar
      const normalizedName = normalizeText(champion.name);
      const normalizedTitle = normalizeText(champion.title);
      const normalizedTags = champion.tags.map(tag => normalizeText(tag)).join(' ');

      // Retorna true si la consulta coincide con algún campo
      return normalizedName.includes(normalizedQuery) ||
        normalizedTitle.includes(normalizedQuery) ||
        normalizedTags.includes(normalizedQuery);
    });
  }, [champions, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-balance bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Campeones
        </h1>
        <p className="text-lg text-muted-foreground text-balance">
          Explora los {champions.length} campeones de League of Legends con detalles, estadísticas y habilidades
        </p>
      </div>

      <Suspense fallback={null}>
        <SearchBar
          placeholder='Buscar campeón por nombre, título o rol...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Suspense>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        {filteredChampions.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>

      {filteredChampions.length === 0 && searchQuery && (
        <p className="text-center text-muted-foreground mt-8">
          No se encontraron campeones para &quot;{searchQuery}&quot;.
        </p>
      )}
    </div>
  )
}
