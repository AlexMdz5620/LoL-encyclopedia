'use client';

import { Champion } from '@/schemas/champions';
import {
    Shield,
    TrendingUp,
    Droplets,
    Zap,
    Heart,
    Activity,
    Battery,
    Flame,
    Swords,
    Target,
    MoveHorizontal,
    ActivitySquare,
    Gauge,
    ArrowUpRight,
    // ChevronLeft,
    // ChevronRight,
    ChevronUp,
    ChevronDown
} from 'lucide-react';
import { useState/* , useEffect */ } from 'react';

type StatsChampionProps = {
    champion: Champion;
}

export default function StatsChampion({ champion }: StatsChampionProps) {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [selectedStats, setSelectedStats] = useState<string[]>([]);

    // Configuración de recursos
    const resourceConfig: Record<string, {
        icon: React.ReactNode,
        color: string,
        description: string
    }> = {
        'Mana': {
            icon: <Droplets className="size-5" />,
            color: 'text-blue-500',
            description: 'Recurso estándar que se consume al usar habilidades'
        },
        'Energía': {
            icon: <Zap className="size-5" />,
            color: 'text-yellow-500',
            description: 'Se regenera rápidamente, permitiendo uso frecuente de habilidades'
        },
        'Valor': {
            icon: <Shield className="size-5" />,
            color: 'text-orange-500',
            description: 'Se genera al recibir o infligir daño'
        },
        'Furia': {
            icon: <Flame className="size-5" />,
            color: 'text-red-500',
            description: 'Se acumula durante el combate, potenciando habilidades'
        },
        'Calor': {
            icon: <TrendingUp className="size-5" />,
            color: 'text-amber-500',
            description: 'Aumenta con el tiempo y uso de habilidades'
        },
        'Coraje': {
            icon: <Heart className="size-5" />,
            color: 'text-pink-500',
            description: 'Se genera al estar cerca de enemigos'
        },
        'Sangre': {
            icon: <Droplets className="size-5" />,
            color: 'text-red-600',
            description: 'Recurso basado en la salud del campeón'
        },
        'Pozo Sangriento': {
            icon: <Droplets className="size-5" />,
            color: 'text-red-700',
            description: 'Recurso único basado en la salud'
        },
        'Ninguno': {
            icon: <Battery className="size-5" />,
            color: 'text-gray-500',
            description: 'Este campeón no utiliza recursos tradicionales'
        }
    };

    const resourceInfo = resourceConfig[champion.partype] || {
        icon: <Activity className="size-5" />,
        color: 'text-purple-500',
        description: 'Recurso especial único de este campeón'
    };

    const hasResource = champion.stats.mp > 0;
    // const resourceAmount = hasResource ? champion.stats.mp : null;

    // Separar estadísticas base vs por nivel
    const baseStats = champion.translatedStats?.filter(stat => {
        return !stat.translatedKey.toLowerCase().includes('por nivel');
    }) || [];

    const perLevelStats = champion.translatedStats?.filter(stat => {
        return stat.translatedKey.toLowerCase().includes('por nivel');
    }) || [];

    // Calcular estadística al nivel actual
    const calculateStatAtLevel = (baseValue: number, perLevelValue: number, level: number) => {
        return baseValue + (perLevelValue * (level - 1));
    };

    // Encontrar estadística por nivel relacionada
    const getRelatedPerLevelStat = (baseStatKey: string) => {
        const mapping: Record<string, string> = {
            'armor': 'armorperlevel',
            'attackdamage': 'attackdamageperlevel',
            'attackspeed': 'attackspeedperlevel',
            'crit': 'critperlevel',
            'hp': 'hpperlevel',
            'hpregen': 'hpregenperlevel',
            'mp': 'mpperlevel',
            'mpregen': 'mpregenperlevel',
            'spellblock': 'spellblockperlevel'
        };

        for (const [key, perLevelKey] of Object.entries(mapping)) {
            if (baseStatKey.includes(key)) {
                return perLevelStats.find(s => s.originalKey.includes(perLevelKey));
            }
        }
        return undefined;
    };

    // Stats principales con iconos específicos
    const getStatIcon = (statKey: string) => {
        const key = statKey.toLowerCase();
        if (key.includes('vida') || key.includes('hp')) return <Heart className="w-5 h-5 text-red-400" />;
        if (key.includes('daño') || key.includes('attack')) return <Swords className="w-5 h-5 text-orange-400" />;
        if (key.includes('armadura') || key.includes('armor')) return <Shield className="w-5 h-5 text-yellow-400" />;
        if (key.includes('resistencia') || key.includes('spellblock')) return <ActivitySquare className="w-5 h-5 text-blue-400" />;
        if (key.includes('movimiento') || key.includes('movespeed')) return <Gauge className="w-5 h-5 text-green-400" />;
        if (key.includes('rango') || key.includes('range')) return <Target className="w-5 h-5 text-purple-400" />;
        if (key.includes('ataque') || key.includes('attackspeed')) return <MoveHorizontal className="w-5 h-5 text-amber-400" />;
        if (key.includes('regeneración') || key.includes('regen')) return <TrendingUp className="w-5 h-5 text-pink-400" />;
        return <Activity className="w-5 h-5 text-gray-400" />;
    };

    // Formatear valores
    const formatStatValue = (value: number, statKey: string) => {
        if (statKey.includes('attackspeed')) return value.toFixed(3);
        if (statKey.includes('percentage') || statKey.includes('ratio')) return `${(value * 100).toFixed(0)}%`;
        return value % 1 === 0 ? value.toString() : value.toFixed(1);
    };

    // Stats clave para mostrar (filtramos algunos menos relevantes)
    const keyStats = baseStats.filter(stat => {
        const ignoreStats = ['mpperlevel', 'critperlevel', 'mpregenperlevel'];
        return !ignoreStats.some(ignore => stat.originalKey.includes(ignore));
    });

    // Alternar selección de stat
    const toggleStatSelection = (statKey: string) => {
        setSelectedStats(prev =>
            prev.includes(statKey)
                ? prev.filter(key => key !== statKey)
                : [...prev, statKey]
        );
    };

    // Reiniciar a nivel 1
    const resetToLevelOne = () => {
        setCurrentLevel(1);
        setSelectedStats([]);
    };

    // Calcular recurso al nivel actual
    const resourceAtLevel = hasResource
        ? calculateStatAtLevel(champion.stats.mp, champion.stats.mpperlevel, currentLevel)
        : null;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-beaufort font-bold text-2xl">Estadísticas</h2>
                        <p className="font-spiegel text-sm text-muted-foreground">
                            Calculadora de estadísticas de {champion.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Selector de Nivel */}
            <div className="hidden lg:block fixed right-1 top-4/12 -translate-y-2/3 z-20">
                <div className="bg-linear-to-b from-primary/20 to-transparent backdrop-blur-lg rounded-2xl p-2 border border-primary/30 shadow-2xl">
                    <div className="flex flex-col items-center gap-1">
                        <button
                            onClick={() => setCurrentLevel(prev => Math.min(18, prev + 1))}
                            disabled={currentLevel >= 18}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors"
                        >
                            <ChevronUp className="w-3 h-3" />
                        </button>

                        <div className="text-center">
                            <div className="font-beaufort font-bold text-xl text-primary">
                                {currentLevel}
                            </div>
                            <div className="font-spiegel text-xs text-gray-400">Nivel</div>
                        </div>

                        <button
                            onClick={() => setCurrentLevel(prev => Math.max(1, prev - 1))}
                            disabled={currentLevel <= 1}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors"
                        >
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="mt-2">
                        <button
                            onClick={resetToLevelOne}
                            className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 rounded-lg font-spiegel text-xs transition-colors"
                        >
                            Reiniciar
                        </button>
                    </div>
                </div>
            </div>

            {/* Recurso al nivel actual */}
            <div className="space-y-4">
                <h3 className="font-beaufort font-bold text-xl">Recurso</h3>
                <div className="bg-linear-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${resourceInfo.color.replace('text', 'bg')}/10`}>
                                <span className={resourceInfo.color}>
                                    {resourceInfo.icon}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-beaufort font-bold text-xl">{champion.partype}</h4>
                                <p className="font-spiegel text-gray-300 text-sm max-w-md">
                                    {resourceInfo.description}
                                </p>
                                {hasResource && (
                                    <div className="flex items-center gap-4 pt-2">
                                        <div className="text-center">
                                            <div className="font-beaufort font-bold text-lg text-blue-400">
                                                {champion.stats.mpregen}
                                            </div>
                                            <div className="font-spiegel text-xs text-gray-400">
                                                Regen/s
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-beaufort font-bold text-lg text-blue-300">
                                                +{champion.stats.mpregenperlevel}
                                            </div>
                                            <div className="font-spiegel text-xs text-gray-400">
                                                por nivel
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            {resourceAtLevel && (
                                <div className="text-center">
                                    <div className="font-beaufort font-bold text-4xl text-primary">
                                        {Math.round(resourceAtLevel)}
                                    </div>
                                    <div className="font-spiegel text-sm text-muted-foreground">
                                        Nivel {currentLevel}
                                    </div>
                                </div>
                            )}

                            {hasResource && champion.stats.mpperlevel > 0 && (
                                <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg">
                                    <ArrowUpRight className="w-4 h-4 text-primary" />
                                    <span className="font-spiegel text-sm">
                                        +{champion.stats.mpperlevel}/nivel
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Estadísticas Calculadas */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-beaufort font-bold text-xl mb-2">Estadísticas Calculadas</h3>
                        <p className="font-spiegel text-sm text-gray-400">
                            Nivel {currentLevel} • {selectedStats.length} seleccionadas
                        </p>
                    </div>
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full ${currentLevel === 1 ? 'bg-primary' : 'bg-green-500'}`} />
                        <span>Nivel {currentLevel}</span>
                    </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {keyStats.map((stat) => {
                        const relatedPerLevel = getRelatedPerLevelStat(stat.originalKey);
                        const valueAtLevel = relatedPerLevel
                            ? calculateStatAtLevel(stat.value, relatedPerLevel.value, currentLevel)
                            : stat.value;
                        const isSelected = selectedStats.includes(stat.originalKey);
                        const maxLevelValue = relatedPerLevel
                            ? calculateStatAtLevel(stat.value, relatedPerLevel.value, 18)
                            : null;

                        return (
                            <div
                                key={stat.originalKey}
                                onClick={() => toggleStatSelection(stat.originalKey)}
                                className={`bg-linear-to-br from-gray-900/30 to-gray-800/10 backdrop-blur-sm rounded-xl p-5 border transition-all cursor-pointer ${isSelected
                                    ? 'border-primary/50 bg-primary/5'
                                    : 'border-gray-700/20 hover:border-gray-600/40'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {getStatIcon(stat.translatedKey)}
                                        <div>
                                            <h4 className="font-beaufort font-semibold capitalize">
                                                {stat.translatedKey.replace('hp', 'Vida').replace('mp', 'Maná')}
                                            </h4>
                                            {relatedPerLevel && relatedPerLevel.value > 0 && (
                                                <div className="font-spiegel text-xs text-green-400">
                                                    +{relatedPerLevel.value.toFixed(1)} por nivel
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {/* Valor actual */}
                                    <div className="text-center">
                                        <div className={`font-beaufort font-bold text-3xl ${currentLevel === 1 ? 'text-primary' : 'text-green-400'
                                            }`}>
                                            {formatStatValue(valueAtLevel, stat.originalKey)}
                                        </div>
                                        <div className="font-spiegel text-xs text-gray-400 mt-1">
                                            Nivel {currentLevel}
                                        </div>
                                    </div>

                                    {/* Comparación nivel 1 vs nivel actual */}
                                    {currentLevel > 1 && relatedPerLevel && relatedPerLevel.value > 0 && (
                                        <div className="pt-4 border-t border-gray-700/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-center">
                                                    <div className="font-spiegel text-xs text-gray-400">Nivel 1</div>
                                                    <div className="font-beaufort font-bold">{stat.value.toFixed(1)}</div>
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-green-500" />
                                                <div className="text-center">
                                                    <div className="font-spiegel text-xs text-gray-400">Nivel 18</div>
                                                    <div className="font-beaufort font-bold">
                                                        {maxLevelValue}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Barra de progreso */}
                                            {/* <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-primary via-green-500 to-green-400 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${((valueAtLevel - stat.value) / (maxLevelValue! - stat.value)) * 100}%`
                                                    }}
                                                />
                                            </div> */}
                                        </div>
                                    )}

                                    {/* Nivel 18 si está seleccionado */}
                                    {/* {isSelected && maxLevelValue && (
                                        <div className="bg-gray-800/30 rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-spiegel text-xs text-gray-400">Nivel 18</span>
                                                <span className="font-beaufort font-bold text-white">
                                                    {formatStatValue(maxLevelValue, stat.originalKey)}
                                                </span>
                                            </div>
                                            <div className="h-1 bg-linear-to-r from-primary to-green-500 rounded-full mt-2" />
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Resumen si hay stats seleccionadas */}
                {selectedStats.length > 0 && (
                    <div className="bg-linear-to-r from-primary/10 to-green-500/5 rounded-xl p-6 border border-primary/20">
                        <h4 className="font-beaufort font-bold text-lg text-primary mb-4">
                            Resumen de Crecimiento
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <div className="font-spiegel text-sm text-gray-400 mb-2">
                                    Estadísticas seleccionadas:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedStats.map(statKey => {
                                        const stat = keyStats.find(s => s.originalKey === statKey);
                                        const relatedPerLevel = getRelatedPerLevelStat(statKey);
                                        const valueAtLevel = relatedPerLevel
                                            ? calculateStatAtLevel(stat!.value, relatedPerLevel.value, currentLevel)
                                            : stat!.value;

                                        return (
                                            <div key={statKey} className="px-3 py-2 bg-gray-800/50 rounded-lg">
                                                <div className="font-beaufort font-semibold text-sm">
                                                    {stat?.translatedKey.replace('hp', 'Vida').replace('mp', 'Maná')}
                                                </div>
                                                <div className="font-spiegel text-xs text-gray-300">
                                                    {formatStatValue(valueAtLevel, statKey)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className="font-spiegel text-sm text-gray-400 mb-2">
                                    Crecimiento total ({currentLevel} niveles):
                                </div>
                                <div className="space-y-2">
                                    {selectedStats.map(statKey => {
                                        const stat = keyStats.find(s => s.originalKey === statKey);
                                        const relatedPerLevel = getRelatedPerLevelStat(statKey);
                                        if (!relatedPerLevel) return null;

                                        const totalGrowth = relatedPerLevel.value * (currentLevel - 1);
                                        return (
                                            <div key={statKey} className="flex items-center justify-between">
                                                <span className="font-spiegel text-sm">
                                                    {stat?.translatedKey.replace('hp', 'Vida').replace('mp', 'Maná')}
                                                </span>
                                                <span className="font-beaufort font-bold text-green-400">
                                                    +{formatStatValue(totalGrowth, statKey)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}