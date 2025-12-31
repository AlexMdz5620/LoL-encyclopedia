import { COMMUNITY_DRAGON_URL, DDRAGON_BASE_URL, getLatestVersion } from '@/lib/ddragon'
import { Runes, runeSchema } from '@/schemas/runes';

export async function getRunes(): Promise<Runes> {
    const lastVersion = await getLatestVersion();
    const runesRes = await fetch(`${DDRAGON_BASE_URL}/${lastVersion}/data/es_MX/runesReforged.json`);
    const runesData = await runesRes.json();

    const validatedRunes = [];
    const errors = [];

    for (const rune of runesData) {
        const result = runeSchema.safeParse(rune);

        if (result.success) {
            validatedRunes.push(result.data);
        } else {
            console.error(`Error validando runa:`, result.error);
            errors.push(result.error);
        }
    }

    if (errors.length > 0) {
        console.warn(`${errors.length} runas fallaron validación`);
    }

    return validatedRunes;
}

export function getRuneImageUrl(iconPath: string): string {
  return `${COMMUNITY_DRAGON_URL}/plugins/rcp-be-lol-game-data/global/default/v1/${iconPath.toLowerCase()}`
}
