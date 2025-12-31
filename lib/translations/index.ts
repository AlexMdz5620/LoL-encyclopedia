// Diccionario de tags de campeones
export const championTagTranslations: Record<string, string> = {
    Assassin: "Asesino",
    Fighter: "Peleador",  // Nota: También se usa "Luchador" a veces
    Mage: "Mago",
    Marksman: "Tirador",  // En algunos contextos "Tirador" es más común que "Fusilero"
    Support: "Soporte",
    Tank: "Tanque"
} as const;

// Diccionario de stats de ítems
const itemStatTranslations: Record<string, string> = {
    FlatArmorMod: "Armadura",
    FlatCritChanceMod: "Probabilidad de Crítico",
    FlatHPPoolMod: "Vida Máxima",
    FlatHPRegenMod: "Regeneración de Vida",
    FlatMPPoolMod: "Maná Máximo",
    FlatMagicDamageMod: "Poder de Habilidad",
    FlatMovementSpeedMod: "Velocidad de Movimiento",
    FlatPhysicalDamageMod: "Daño de Ataque",
    FlatSpellBlockMod: "Resistencia Mágica",
    PercentAttackSpeedMod: "Velocidad de Ataque",
    PercentLifeStealMod: "Robo de Vida",
    PercentMovementSpeedMod: "Velocidad de Movimiento (%)"  // Normalmente se muestra como "%"
} as const;

const championStatTranslations: Record<string, string> = {
    armor: 'Armadura',
    armorperlevel: 'Armadura por Nivel',
    attackdamage: 'Daño de Ataque',
    attackdamageperlevel: 'Daño de Ataque por Nivel',
    attackrange: 'Rango de Ataque',
    attackspeed: 'Velocidad de Ataque',
    attackspeedperlevel: 'Velocidad de Ataque por Nivel',
    crit: 'Críticos',
    critperlevel: 'Críticos por Nivel',
    hp: 'HP',
    hpperlevel: 'HP por Nivel',
    hpregen: 'Regeneración de HP',
    hpregenperlevel: 'Regeneración de HP por Nivel',
    movespeed: 'Velocidad de Movimiento',
    mp: 'MP',
    mpperlevel: 'MP por Nivel',
    mpregen: 'Regeneración de MP',
    mpregenperlevel: 'Regeneración de MP por Nivel',
    spellblock: 'Resistencia Mágica',
    spellblockperlevel: 'Resistencia Mágica por Nivel',
} as const;

// Funciones traductoras con logging de términos faltantes
export function translateChampionTag(englishTag: string): string {
    const translation = championTagTranslations[englishTag];

    if (!translation) {
        // Solo log en desarrollo para no saturar producción
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[TRADUCCIÓN] Tag de campeón no encontrado: "${englishTag}"`);
        }
        return englishTag; // Fallback al inglés
    }
    return translation;
}

export function translateItemStat(englishStat: string): string {
    const translation = itemStatTranslations[englishStat];

    if (!translation) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[TRADUCCIÓN] Stat de ítem no encontrado: "${englishStat}"`);
        }
        return englishStat; // Fallback al inglés
    }
    return translation;
}

export function translateChampionStat(englishStat: string): string {
    const translation = championStatTranslations[englishStat];

    if (!translation) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[TRADUCCIÓN] Stat del campeón no encontrado: "${englishStat}"`);
        }
        return englishStat;
    };

    return translation
}
