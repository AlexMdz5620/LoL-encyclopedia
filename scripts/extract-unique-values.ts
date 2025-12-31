// scripts/extract-unique-values.js
import { getChampions } from '@/services/champions';
import { getItems } from '@/services/items'; // Asume que ya tienes este servicio

export async function extractUniqueValues() {
    console.log('📦 Extrayendo valores únicos...\n');

    // Obtener datos
    const champions = await getChampions();
    const items = await getItems(); // Asegúrate de tener este servicio

    // Extraer TAGS de campeones (únicos)
    const championTagsSet = new Set();
    champions.forEach(champion => {
        champion.tags.forEach(tag => championTagsSet.add(tag));
    });

    // Extraer STATS de ítems (únicos)
    const itemStatsSet = new Set();
    items.forEach(item => {
        Object.keys(item.stats).forEach(stat => itemStatsSet.add(stat));
    });

    // Mostrar resultados en formato amigable
    console.log('=== TAGS DE CAMPEONES (Únicos) ===');
    console.log(Array.from(championTagsSet).sort());

    console.log('\n=== STATS DE ÍTEMS (Únicos) ===');
    console.log(Array.from(itemStatsSet).sort());

    // También mostrar en formato objeto JSON para copiar y pegar directo a tu diccionario
    console.log('\n🎯 **PARA TU DICCIONARIO JSON**');
    console.log('// championTagTranslations');
    console.log(JSON.stringify(Object.fromEntries(
        Array.from(championTagsSet).sort().map(tag => [tag, ''])
    ), null, 2));

    console.log('\n// itemStatTranslations');
    console.log(JSON.stringify(Object.fromEntries(
        Array.from(itemStatsSet).sort().map(stat => [stat, ''])
    ), null, 2));
}

// Ejecutar
// extractUniqueValues().catch(console.error);