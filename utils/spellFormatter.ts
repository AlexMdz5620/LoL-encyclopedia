import { Champion } from '@/schemas/champions';

// utils/spellFormatter.ts
export interface SpellVar {
    link?: string;
    coeff: number | number[];  // ¡Puede ser número O array de números!
    dyn?: string;
    key?: string;  // ¡Puede ser undefined!
}

export interface ProcessedTooltip {
    html: string;
    variables: Array<{
        key: string;
        value: string;
        description: string;
    }>;
    champion?: Champion;
}

export function processSpellTooltip(
    tooltip: string,
    vars: SpellVar[] = [],
    effectBurn: (string | null)[] = [],  // ¡Puede tener nulls!
    level: number = 1,
    champion: Champion
): ProcessedTooltip {
    let processedHtml = tooltip;
    const foundVariables: Array<{ key: string; value: string; description: string }> = [];
    
    // Si no hay tooltip, devolver vacío
    if (!tooltip) {
        return {
            html: '',
            variables: [],
        };
    }
    
    // Expresión regular para encontrar placeholders
    const placeholderRegex = /\{\{(.*?)\}\}/g;
    const matches = Array.from(tooltip.matchAll(placeholderRegex));
    
    for (const match of matches) {
        const fullMatch = match[0];
        const content = match[1].trim();
        
        let value = '';
        let description = '';
        let varKey = '';
        
        // 1. Buscar en vars
        const varMatch = content.match(/^([a-zA-Z0-9]+)/);
        if (varMatch) {
            varKey = varMatch[1];
            const varData = vars.find(v => v.key === varKey);
            
            if (varData && varData.coeff !== undefined) {
                // Extraer coeficiente (puede ser number o number[])
                let coeffValue: number;
                if (Array.isArray(varData.coeff)) {
                    const coeffIndex = Math.min(level - 1, varData.coeff.length - 1);
                    coeffValue = varData.coeff[coeffIndex] || 0;
                } else {
                    coeffValue = varData.coeff;
                }
                
                // Aplicar operaciones matemáticas si existen
                if (content.includes('*')) {
                    const operationMatch = content.match(/\*([-\d.]+)/);
                    if (operationMatch) {
                        const multiplier = parseFloat(operationMatch[1]);
                        coeffValue *= multiplier;
                    }
                }
                
                // Formatear según el tipo
                if (varKey.includes('percentage') || varKey.includes('slow') || varKey.includes('ratio')) {
                    // Para porcentajes, el coeficiente suele ser decimal (0.25 para 25%)
                    value = `${Math.round(coeffValue * 100)}%`;
                    description = `Porcentaje`;
                } else {
                    value = Number.isInteger(coeffValue) 
                        ? coeffValue.toString() 
                        : coeffValue.toFixed(1);
                    description = `Valor`;
                }
                
                processedHtml = processedHtml.replace(fullMatch, 
                    `<span class="text-primary font-bold">${value}</span>`
                );
                
                foundVariables.push({ key: varKey, value, description: `${description} (Nivel ${level})` });
                continue;
            }
        }
        
        // 2. Buscar en effectBurn (e1, e2, etc.)
        const effectMatch = content.match(/^e(\d+)/);
        if (effectMatch && effectBurn.length > 0) {
            const effectIndex = parseInt(effectMatch[1]) - 1;
            if (effectIndex >= 0 && effectIndex < effectBurn.length && effectBurn[effectIndex]) {
                const effectStr = effectBurn[effectIndex]!;
                // Los effectBurn suelen venir como "50/85/120/155/190"
                const values = effectStr.split('/');
                const valueIndex = Math.min(level - 1, values.length - 1);
                value = values[valueIndex] || effectStr;
                
                processedHtml = processedHtml.replace(fullMatch,
                    `<span class="text-accent font-bold">${value}</span>`
                );
                
                foundVariables.push({ 
                    key: `e${effectIndex + 1}`, 
                    value, 
                    description: `Efecto ${effectIndex + 1} (Nivel ${level})` 
                });
                continue;
            }
        }
        
        // 3. Placeholders especiales conocidos
        const specialPlaceholders: Record<string, string> = {
            'spellmodifierdescriptionappend': 'Modificador de hechizo',
            'abilityresourcedisplayname': champion?.partype || 'Recurso',
        };
        
        if (specialPlaceholders[content]) {
            processedHtml = processedHtml.replace(fullMatch,
                `<span class="text-gray-400 italic">[${specialPlaceholders[content]}]</span>`
            );
            continue;
        }
        
        // 4. Si no se procesa, dejar visible
        processedHtml = processedHtml.replace(fullMatch,
            `<span class="text-destructive/70 bg-destructive/10 px-1 rounded">${fullMatch}</span>`
        );
    }
    
    return {
        html: processedHtml,
        variables: foundVariables
    };
}

// Función auxiliar para extraer valores de effectBurn
export function getEffectValues(effectBurn: (string | null)[], level: number): string[] {
    if (!effectBurn || effectBurn.length === 0) return [];
    
    return effectBurn.map(effect => {
        if (!effect) return 'N/A';
        
        const values = effect.split('/');
        const index = Math.min(level - 1, values.length - 1);
        return values[index] || effect;
    });
}