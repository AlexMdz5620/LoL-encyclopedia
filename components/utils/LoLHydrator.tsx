"use client";

import { Champions } from '@/schemas/champions';
import { Items } from '@/schemas/items';
import { Runes } from '@/schemas/runes';
import { useLoLStore } from '@/stores';
import { useEffect } from 'react';

type InitialData = {
    version: string;
    champions: Champions;
    items: Items;
    runes: Runes;
}
export default function LoLHydrator({ initialData }: { initialData: InitialData }) {
    const { setVersion, setChampions, setItems, setRunes } = useLoLStore();
    const { version, champions, items, runes } = initialData;

    useEffect(() => {
        setVersion(version);
        setChampions(champions);
        setItems(items);
        setRunes(runes)
    }, [
        version,
        champions,
        items,
        runes,
        setVersion,
        setChampions,
        setItems,
        setRunes
    ]);

    return null;
}
