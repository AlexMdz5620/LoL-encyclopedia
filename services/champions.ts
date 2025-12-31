import { DDRAGON_BASE_URL, getLatestVersion } from '@/lib/ddragon';
import { translateChampionStat, translateChampionTag } from '@/lib/translations';
import { Champion, Champions, championSchema } from '@/schemas/champions';

const latestVersion = await getLatestVersion();

export async function getChampions(): Promise<Champions> {
  const championsRes = await fetch(
    `${DDRAGON_BASE_URL}/${latestVersion}/data/es_MX/champion.json`
  );
  const data = await championsRes.json();
  const champions = data.data;

  const validatedChampions = [];
  const errors = [];

  for (const champion of Object.values(champions)) {
    const result = championSchema.safeParse(champion);

    if (result.success) {
      const translatedChampion = {
        ...result.data,
        tags: result.data.tags.map(tag => translateChampionTag(tag))
      };

      validatedChampions.push(translatedChampion);
    } else {
      console.error(`Error validando campeón:`, result.error);
      errors.push(result.error);
    }
  }

  if (errors.length > 0) {
    console.warn(`${errors.length} campeones fallaron validación`);
  }

  return validatedChampions;
}

export async function fetchChampionDetails(championId: string): Promise<Champion> {
  const latestVersion = await getLatestVersion();
  const response = await fetch(
    `${DDRAGON_BASE_URL}/${latestVersion}/data/es_MX/champion/${championId}.json`,
    { next: { revalidate: 3600 } } // Cache por 1 hora
  );

  if (!response.ok) {
    throw new Error(`Error al obtener datos del campeón: ${response.status}`);
  }

  const data = await response.json();
  const championData = data.data[championId];

  // Validar con Zod
  const result = championSchema.safeParse(championData);
  if (!result.success) {
    console.error('Error de validación:', result.error);
    throw new Error('Datos del campeón inválidos');
  }

  // Crear objeto con traducciones
  const translatedChampion = {
    ...result.data,
    tags: result.data.tags.map(tag => translateChampionTag(tag)),
    // Mantener stats original pero añadir campo traducido
    translatedStats: Object.entries(result.data.stats).map(([key, value]) => ({
      originalKey: key,
      translatedKey: translateChampionStat(key),
      value
    }))
  };

  return translatedChampion;
}
