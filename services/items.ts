/* eslint-disable @typescript-eslint/no-explicit-any */
import { DDRAGON_BASE_URL, getLatestVersion } from '@/lib/ddragon';
import { translateItemStat } from '@/lib/translations';
import { Items, itemSchema } from '@/schemas/items';

// Define el tipo para los datos crudos (sin validar)
type RawItemData = Record<string, unknown>;

export async function getItems(): Promise<Items> {
    const latestVersion = await getLatestVersion();
    const itemsRes = await fetch(`${DDRAGON_BASE_URL}/${latestVersion}/data/es_MX/item.json`);
    const data = await itemsRes.json();

    // Aserción de tipo aquí
    const rawItems = data.data as RawItemData;

    const validatedItems: Items = [];
    const errors: Array<{ id: string, error: unknown }> = [];
    const uniqueItemsMap = new Map<string, unknown>();

    // Usa Object.entries con el tipo adecuado
    for (const [id, rawItem] of Object.entries(rawItems)) {
        // 1. Filtrar items no comprables (con verificación segura)
        if (
            typeof rawItem === 'object' &&
            rawItem !== null &&
            'gold' in rawItem &&
            typeof (rawItem as any).gold === 'object' &&
            (rawItem as any).gold?.purchasable === false
        ) {
            continue;
        }

        // 2. Validar con Zod
        const result = itemSchema.safeParse(rawItem);

        if (result.success) {
            // TRADUCCIÓN APLICADA AQUÍ: crea array de stats traducidas
            const translatedStats = Object.entries(result.data.stats).map(([key, value]) => ({
                key, // Mantenemos la clave original por si acaso
                translatedName: translateItemStat(key),
                value
            }));

            const itemWithId = { id, ...result.data, translatedStats };

            // 3. Eliminar duplicados por nombre
            if (!uniqueItemsMap.has(itemWithId.name)) {
                uniqueItemsMap.set(itemWithId.name, itemWithId);
                validatedItems.push(itemWithId);
            }
        } else {
            console.error(`Error validando item ${id}:`, result.error);
            errors.push({ id, error: result.error });
        }
    }

    if (errors.length > 0) {
        console.warn(`${errors.length} items fallaron validación`);
    }

    return validatedItems;
}
