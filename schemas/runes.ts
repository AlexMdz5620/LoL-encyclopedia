import z from 'zod';

const individualRuneSchema = z.object({
    icon: z.string(),
    id: z.number(),
    key: z.string(),
    longDesc: z.string(),
    name: z.string(),
    shortDesc: z.string(),
});

const slotSchema = z.object({
    runes: z.array(individualRuneSchema)
});

export const runeSchema = z.object({
    icon: z.string(),
    id: z.number(),
    key: z.string(),
    name: z.string(),
    slots: z.array(slotSchema),
}).strip();

export type Rune = z.infer<typeof runeSchema>;
export type Runes = Rune[];
