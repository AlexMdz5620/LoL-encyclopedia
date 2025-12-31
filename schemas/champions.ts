import z from 'zod';

// ==================== ESQUEMAS BÁSICOS ====================
const imageChampion = z.object({
    full: z.string(),
    group: z.string(),
    sprite: z.string(),
    h: z.number(),
    w: z.number(),
    x: z.number(),
    y: z.number(),
});

const infoChampion = z.object({
    attack: z.number(),
    defense: z.number(),
    difficulty: z.number(),
    magic: z.number(),
});

const statsChampion = z.object({
    armor: z.number(),
    armorperlevel: z.number(),
    attackdamage: z.number(),
    attackdamageperlevel: z.number(),
    attackrange: z.number(),
    attackspeed: z.number(),
    attackspeedperlevel: z.number(),
    crit: z.number(),
    critperlevel: z.number(),
    hp: z.number(),
    hpperlevel: z.number(),
    hpregen: z.number(),
    hpregenperlevel: z.number(),
    movespeed: z.number(),
    mp: z.number(),
    mpperlevel: z.number(),
    mpregen: z.number(),
    mpregenperlevel: z.number(),
    spellblock: z.number(),
    spellblockperlevel: z.number(),
});

// ==================== ESQUEMAS COMPLEJOS ====================
const passiveChampion = z.object({
    name: z.string(),
    description: z.string(),
    image: imageChampion,
});

const skinsChampion = z.object({
    chromas: z.boolean(),
    id: z.string(),
    name: z.string(),
    num: z.number(),
});

const spellVarSchema = z.object({
    link: z.string(),
    coeff: z.union([z.number(), z.array(z.number())]),
    dyn: z.string().optional(),
    key: z.string().optional(),
});

const spellsLevelTipChampion = z.object({
    label: z.array(z.string()),
    effect: z.array(z.string()),
});

// ¡IMPORTANTE! Datavalues es un objeto especial que varía por campeón
// No tiene estructura fija, así que lo definimos como unknown
const datavaluesSchema = z.record(z.any(), z.any()).optional();

const spellsChampion = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    tooltip: z.string(),
    leveltip: spellsLevelTipChampion.optional(),
    maxrank: z.number(),
    cooldown: z.array(z.number()),
    cooldownBurn: z.string(),
    cost: z.array(z.union([z.number(), z.null()])), // ¡Algunos costos pueden ser null!
    costBurn: z.string(),
    costType: z.string(),
    maxammo: z.string(),
    range: z.array(z.union([z.number(), z.null()])), // ¡Algunos rangos pueden ser null!
    rangeBurn: z.string(),
    image: imageChampion,
    resource: z.string().optional(),
    datavalues: datavaluesSchema,
    effect: z.array(z.array(z.union([z.number(), z.null()])).nullable()).optional(),
    effectBurn: z.array(z.union([z.string(), z.null()])).optional(),
    vars: z.array(spellVarSchema).optional(),
});

// ==================== RECOMMENDED (BUILDS) ====================
// Los recommended son builds predefinidas, estructuras muy variables
const recommendedItemBlock = z.object({
    type: z.string(),
    recMath: z.boolean().optional(),
    recSteps: z.boolean().optional(),
    minSummonerLevel: z.number().optional(),
    maxSummonerLevel: z.number().optional(),
    showIfSummonerSpell: z.string().optional(),
    hideIfSummonerSpell: z.string().optional(),
    items: z.array(z.object({
        id: z.string(),
        count: z.number(),
    })),
});

const recommendedBlock = z.object({
    champion: z.string().optional(),
    title: z.string(),
    type: z.string(),
    map: z.string(),
    mode: z.string(),
    priority: z.boolean().optional(),
    blocks: z.array(recommendedItemBlock),
});

// ==================== ESQUEMA PRINCIPAL ====================
export const championSchema = z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    title: z.string(),
    blurb: z.string(),
    info: infoChampion,
    image: imageChampion,
    tags: z.array(z.string()),
    partype: z.string(),
    stats: statsChampion,

    // Campos opcionales que NO todos los campeones tienen
    allytips: z.array(z.string()).optional().default([]),
    enemytips: z.array(z.string()).optional().default([]),
    lore: z.string().optional().default(''),

    // Estructuras más complejas
    passive: passiveChampion.optional(),
    skins: z.array(skinsChampion).optional().default([]),
    spells: z.array(spellsChampion).optional().default([]),
    recommended: z.array(recommendedBlock).optional().default([]),

    // ¡Campo IMPORTANTE que tu JSON muestra!
    // La API devuelve version pero no está en tu schema actual
    version: z.string().optional(),
}).strip();

export type Champion = z.infer<typeof championSchema> & {
    translatedStats?: Array<{
        originalKey: string;
        translatedKey: string;
        value: number;
    }>;
};
export type Champions = Champion[];