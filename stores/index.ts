import { Champions } from '@/schemas/champions';
import { Items } from '@/schemas/items';
import { Runes } from '@/schemas/runes';
import { create } from 'zustand';

interface LoLStore {
    version: string;
    champions: Champions;
    items: Items;
    runes: Runes,
    setVersion: (version: string) => void;
    setChampions: (champions: Champions) => void;
    setItems: (items: Items) => void;
    setRunes: (runes: Runes) => void;
}

export const useLoLStore = create<LoLStore>(set => ({
    version: '',
    champions: [],
    items: [],
    runes: [],
    setVersion: (version) => set({ version }),
    setChampions: (champions) => set({ champions }),
    setItems: (items) => set({ items }),
    setRunes: (runes) => set({ runes }),
}));