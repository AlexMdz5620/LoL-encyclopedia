"use client";

import { useLoLStore } from '@/stores';
import { Suspense, useMemo, useState } from 'react';
import SearchBar from '../layout/SearchBar';
import ItemCard from './ItemCard';

export default function SectionItem() {
    const { version, items } = useLoLStore();
    const [searchQuery, setSearchQuery] = useState('');

    const normalizeText = (text: string) => {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;

        const normalizedQuery = normalizeText(searchQuery);

        return items.filter(item => {
            // Busca en name, plaintext, tags y colloq (si existe en tu schema)
            const normalizedName = normalizeText(item.name);
            const normalizedPlaintext = normalizeText(item.plaintext);
            const normalizedTags = item.tags.map(tag => normalizeText(tag)).join(' ');
            const normalizedColloq = item.colloq ? normalizeText(item.colloq) : '';

            return normalizedName.includes(normalizedQuery) ||
                normalizedPlaintext.includes(normalizedQuery) ||
                normalizedTags.includes(normalizedQuery) ||
                normalizedColloq.includes(normalizedQuery);
        });
    }, [items, searchQuery]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 text-balance bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Items
                </h1>
                <p className="text-lg text-muted-foreground text-balance">
                    Descrubre todos los items de League of Legends con sus Estadísticas, Costos y Rutas de Construcción
                </p>
            </div>

            <Suspense fallback={null}>
                <SearchBar
                    placeholder="Buscar ítem por nombre, efecto o tipo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Suspense>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-8">
                {filteredItems.map(item => (
                    <ItemCard
                        key={item.name}
                        item={item}
                        items={items}
                        version={version}
                    />
                ))}
            </div>
            {filteredItems.length === 0 && searchQuery && (
                <p className="text-center text-muted-foreground mt-8">
                    No se encontraron ítems para &quot;{searchQuery}&quot;.
                </p>
            )}
        </div>
    )
}
