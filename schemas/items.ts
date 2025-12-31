import z from 'zod';

const goldItem = z.object({
    base: z.number(),
    purchasable: z.boolean(),
    sell: z.number(),
    total: z.number(),
});

const imageItem = z.object({
    full: z.string(),
    group: z.string(),
    sprite: z.string(),
    // h: z.number(),
    // w: z.number(),
    // x: z.number(),
    // y: z.number(),
});

export const itemStatTranslationSchema = z.object({
    key: z.string(),
    translatedName: z.string(),
    value: z.number()
});

export const itemSchema = z.object({
    id: z.string().optional(),
    colloq: z.string(),
    description: z.string(),
    gold: goldItem,
    image: imageItem,
    into: z.array(z.string()).optional(),
    from: z.array(z.string()).optional(),
    inStore: z.boolean().optional(),
    maps: z.record(z.string(), z.boolean()),
    name: z.string(),
    plaintext: z.string(),
    stats: z.record(z.string(), z.number()).or(z.object({})),
    tags: z.array(z.string()),
}).strip();

export type ItemBase = z.infer<typeof itemSchema>;
export type Item = ItemBase & {
    translatedStats: Array<{
        key: string;
        translatedName: string;
        value: number;
    }>;
}
export type Items = Item[];
