"use client";

import { useLoLStore } from '@/stores';
import RuneTree from './RuneTree';

export default function SectionRune() {
    const { runes } = useLoLStore();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 text-balance bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Runas
                </h1>
                <p className="text-lg text-muted-foreground text-balance">
                    Explora todos los caminos de Runas y las Piedras Clave (Keystone) para personalizar el estilo de juego de tu campeón.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {runes.map((rune) => (
                    <RuneTree key={rune.id} rune={rune} />
                ))}
            </div>
        </div>
    )
}
