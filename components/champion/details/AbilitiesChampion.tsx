import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DDRAGON_BASE_URL } from '@/lib/ddragon';
import { Champion } from '@/schemas/champions';
import Image from 'next/image';
import { useState } from 'react';
import {
    Zap,
    Clock,
    Target,
    Coins,
    Sword,
    AlertTriangle,
    BarChart3,
    Layers
} from 'lucide-react';

type AbilitiesChampionProps = {
    champion: Champion;
    version: string;
}

export default function AbilitiesChampion({ champion, version }: AbilitiesChampionProps) {
    const [selectedLevel, setSelectedLevel] = useState(1);
    const passive = champion.passive;
    const spells = champion.spells || [];

    if (!passive && spells.length === 0) {
        return (
            <div className="text-center py-12 px-4">
                <p className="text-gray-400">No hay información de habilidades disponible</p>
            </div>
        );
    }

    const getValueAtLevel = (values: (number | null)[] | undefined, level: number) => {
        if (!values || values.length === 0) return null;
        const index = Math.min(level - 1, values.length - 1);
        return values[index];
    };

    const levels = [1, 2, 3, 4, 5];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="space-y-3 md:space-y-4 px-4 md:px-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20 shrink-0">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-beaufort font-bold text-xl md:text-2xl">Habilidades</h2>
                        <p className="font-spiegel text-xs md:text-sm text-muted-foreground">
                            Detalles de las habilidades de {champion.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs de habilidades - Versión Mobile Optimizada */}
            <Tabs defaultValue="passive" className="w-full">
                {/* TabsList Scrollable en Mobile */}
                <div className="pt-2">
                    <TabsList className="inline-flex flex-wrap pb-2 h-fit space-x-1 bg-card/5">
                        {/* Pasiva */}
                        {passive && (
                            <TabsTrigger
                                value="passive"
                                className="data-[state=active]:bg-primary/30 data-[state=active]:text-white hover:bg-gray-800/50 p-2 md:py-4 rounded-lg transition-all cursor-pointer min-w-20 md:min-w-0"
                            >
                                <div className="flex flex-col items-center gap-1 md:gap-2">
                                    <div className="relative w-8 h-8 md:w-12 md:h-12">
                                        <Image
                                            src={`${DDRAGON_BASE_URL}/${version}/img/passive/${passive.image.full}`}
                                            alt={passive.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 32px, 48px"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <div className="font-beaufort font-bold text-xs md:text-base">Pasiva</div>
                                        <div className="font-spiegel text-[10px] md:text-xs opacity-75 truncate max-w-17.5 md:max-w-20">
                                            {passive.name}
                                        </div>
                                    </div>
                                </div>
                            </TabsTrigger>
                        )}

                        {/* Habilidades activas */}
                        {spells.map((spell, index) => {
                            const key = ['Q', 'W', 'E', 'R'][index];
                            return (
                                <TabsTrigger
                                    key={spell.id}
                                    value={key}
                                    className="data-[state=active]:bg-primary/30 data-[state=active]:text-white hover:bg-gray-800/50 p-2 md:py-4 rounded-lg transition-all cursor-pointer min-w-20 md:min-w-0"
                                >
                                    <div className="flex flex-col items-center gap-1 md:gap-2">
                                        <div className="relative w-8 h-8 md:w-12 md:h-12">
                                            <Image
                                                src={`${DDRAGON_BASE_URL}/${version}/img/spell/${spell.image.full}`}
                                                alt={spell.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 32px, 48px"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-beaufort font-bold text-xs md:text-base">{key}</div>
                                            <div className="font-spiegel text-[10px] md:text-xs opacity-75 truncate max-w-17.5 md:max-w-20">
                                                {spell.name}
                                            </div>
                                        </div>
                                    </div>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                </div>

                {/* Contenido de la Pasiva */}
                {passive && (
                    <TabsContent value="passive" className="mt-1 md:mt-10 py-1 md:py-14 px-4 md:px-0">
                        <Card className="bg-card/0 border-none shadow-none">
                            <CardContent className="p-4 md:p-8">
                                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                                    {/* Columna izquierda - Mobile Stacked */}
                                    <div className="w-full lg:w-1/3 space-y-4 md:space-y-6">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-amber-500/50 shrink-0">
                                                <Image
                                                    src={`${DDRAGON_BASE_URL}/${version}/img/passive/${passive.image.full}`}
                                                    alt={passive.name}
                                                    fill
                                                    className="object-contain p-2"
                                                    sizes="(max-width: 768px) 64px, 80px"
                                                />
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <div className="font-beaufort font-bold text-xl md:text-2xl">{passive.name}</div>
                                                <div className="font-spiegel text-sm md:text-base text-amber-300">Pasiva Innata</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Columna derecha */}
                                    <div className="w-full lg:w-2/3 space-y-4 md:space-y-6">
                                        <div>
                                            <h4 className="font-beaufort font-bold text-lg md:text-xl mb-3 md:mb-4">Descripción</h4>
                                            <div
                                                className="font-spiegel text-sm md:text-base text-gray-300 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: passive.description }}
                                            />
                                        </div>

                                        {/* Análisis estratégico - Grid Responsivo */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            <div className="bg-gray-800/50 rounded-lg p-3 md:p-4">
                                                <div className="flex items-center gap-2 mb-2 md:mb-3">
                                                    <Sword className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                                                    <h5 className="font-beaufort font-bold text-sm md:text-base">Fortaleza</h5>
                                                </div>
                                                <p className="font-spiegel text-xs md:text-sm text-gray-300">
                                                    Esta pasiva define el estilo de juego de {champion.name},
                                                    proporcionando ventajas únicas en combate.
                                                </p>
                                            </div>

                                            <div className="bg-gray-800/50 rounded-lg p-3 md:p-4">
                                                <div className="flex items-center gap-2 mb-2 md:mb-3">
                                                    <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                                                    <h5 className="font-beaufort font-bold text-sm md:text-base">Contra</h5>
                                                </div>
                                                <p className="font-spiegel text-xs md:text-sm text-gray-300">
                                                    Los enemigos deben estar atentos a esta pasiva para
                                                    evitar ventajas injustas en el intercambio.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                )}

                {/* Contenido de habilidades activas */}
                {spells.map((spell, index) => {
                    const key = ['Q', 'W', 'E', 'R'][index];
                    const cooldownAtLevel = getValueAtLevel(spell.cooldown, selectedLevel);
                    const costAtLevel = getValueAtLevel(spell.cost, selectedLevel);
                    const rangeAtLevel = getValueAtLevel(spell.range, selectedLevel);

                    return (
                        <TabsContent key={spell.id} value={key} className="mt-1 md:mt-10 py-1 md:py-14 px-4 md:px-0">
                            <Card className="bg-card/0 border-none shadow-none">
                                <CardContent className="p-4 md:p-8">
                                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                                        {/* Columna izquierda */}
                                        <div className="w-full lg:w-1/3 space-y-4 md:space-y-6">
                                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-primary/50 shrink-0">
                                                    <Image
                                                        src={`${DDRAGON_BASE_URL}/${version}/img/spell/${spell.image.full}`}
                                                        alt={spell.name}
                                                        fill
                                                        className="object-contain p-2"
                                                        sizes="(max-width: 768px) 64px, 80px"
                                                    />
                                                </div>
                                                <div className="text-center sm:text-left">
                                                    <div className="font-beaufort font-bold text-xl md:text-2xl">{spell.name}</div>
                                                    <div className="font-spiegel text-primary font-bold text-sm md:text-base">Tecla: {key}</div>
                                                    <div className="font-spiegel text-xs md:text-sm text-gray-400">
                                                        Nivel máximo: {spell.maxrank}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Selector de nivel - Versión Mobile */}
                                            <div className="bg-secondary/30 rounded-xl p-3 md:p-4">
                                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                                        <h3 className="font-beaufort font-bold text-base md:text-lg">Valores por Nivel</h3>
                                                    </div>
                                                    <div className="text-xs md:text-sm text-muted-foreground">
                                                        Nv: <span className="text-primary font-bold">{selectedLevel}</span>
                                                    </div>
                                                </div>

                                                {/* Grid de niveles responsivo */}
                                                <div className="grid grid-cols-5 gap-1 md:flex md:flex-col md:gap-2">
                                                    {key === 'R'
                                                        ? levels.slice(0, 3).map(level => (
                                                            <button
                                                                key={level}
                                                                onClick={() => setSelectedLevel(level)}
                                                                className={`py-1 md:py-1.5 rounded-lg font-beaufort font-bold text-xs md:text-sm transition-all ${selectedLevel === level ? 'bg-primary/30 text-white' : 'bg-secondary hover:bg-secondary/80'} cursor-pointer`}
                                                            >
                                                                Nv. {level}
                                                            </button>
                                                        ))
                                                        : levels.map(level => (
                                                            <button
                                                                key={level}
                                                                onClick={() => setSelectedLevel(level)}
                                                                className={`py-1 md:py-1.5 rounded-lg font-beaufort font-bold text-xs md:text-sm transition-all ${selectedLevel === level ? 'bg-primary/30 text-white' : 'bg-secondary hover:bg-secondary/80'} cursor-pointer`}
                                                            >
                                                                Nv. {level}
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Columna derecha */}
                                        <div className="w-full lg:w-2/3 space-y-4 md:space-y-6">
                                            {/* Descripción */}
                                            <div>
                                                <h4 className="font-beaufort font-bold text-lg md:text-xl mb-3 md:mb-4">Descripción</h4>
                                                <div
                                                    className="font-spiegel text-sm md:text-base text-gray-300 leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: spell.description }}
                                                />
                                            </div>

                                            {/* Stats en tarjetas - Grid Mobile */}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                                                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-400 mx-auto mb-1 md:mb-2" />
                                                    <div className="font-beaufort font-bold text-lg md:text-xl">
                                                        {cooldownAtLevel !== null ? `${cooldownAtLevel}s` : 'N/A'}
                                                    </div>
                                                    <div className="font-spiegel text-xs text-gray-400">Enfriamiento</div>
                                                </div>

                                                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                                    <Coins className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mx-auto mb-1 md:mb-2" />
                                                    <div className="font-beaufort font-bold text-lg md:text-xl">
                                                        {costAtLevel !== null ? costAtLevel : '0'}
                                                    </div>
                                                    <div className="font-spiegel text-xs text-gray-400">Coste</div>
                                                </div>

                                                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                                    <Target className="w-5 h-5 md:w-6 md:h-6 text-green-400 mx-auto mb-1 md:mb-2" />
                                                    <div className="font-beaufort font-bold text-lg md:text-xl">
                                                        {rangeAtLevel !== null ? rangeAtLevel : 'Auto'}
                                                    </div>
                                                    <div className="font-spiegel text-xs text-gray-400">Rango</div>
                                                </div>

                                                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                                    <Layers className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
                                                    <div className="font-beaufort font-bold text-lg md:text-xl">
                                                        {spell.maxrank}
                                                    </div>
                                                    <div className="font-spiegel text-xs text-gray-400">Niveles</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
}