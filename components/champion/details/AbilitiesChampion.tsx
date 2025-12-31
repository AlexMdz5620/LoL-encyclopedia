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
    // ChevronRight,
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

    // Si no hay habilidades, mostrar mensaje
    if (!passive && spells.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No hay información de habilidades disponible</p>
            </div>
        );
    }

    // Función para obtener valores por nivel
    const getValueAtLevel = (values: (number | null)[] | undefined, level: number) => {
        if (!values || values.length === 0) return null;
        const index = Math.min(level - 1, values.length - 1);
        return values[index];
    };

    // Tabla de niveles
    const levels = [1, 2, 3, 4, 5];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-beaufort font-bold text-2xl">Habilidades</h2>
                        <p className="font-spiegel text-sm text-muted-foreground">
                            Detalles completos de todas las habilidades de {champion.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs de habilidades */}
            <Tabs defaultValue="passive" className="w-full">
                <TabsList className="grid grid-cols-5 gap-2 bg-secondary/0 p-2 m-2 rounded-xl">
                    {/* Pasiva */}
                    {passive && (
                        <TabsTrigger
                            value="passive"
                            className="data-[state=active]:bg-primary/30 data-[state=active]:text-white hover:bg-gray-800/50 py-4 rounded-lg transition-all cursor-pointer"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={`${DDRAGON_BASE_URL}/${version}/img/passive/${passive.image.full}`}
                                        alt={passive.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <div className="font-beaufort font-bold">Pasiva</div>
                                    <div className="font-spiegel text-xs opacity-75">{passive.name}</div>
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
                                className="data-[state=active]:bg-primary/30 data-[state=active]:text-white hover:bg-gray-800/50 py-4 rounded-lg transition-all cursor-pointer"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="relative w-12 h-12">
                                        <Image
                                            src={`${DDRAGON_BASE_URL}/${version}/img/spell/${spell.image.full}`}
                                            alt={spell.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-beaufort font-bold">{key}</div>
                                        <div className="font-spiegel text-xs opacity-75 truncate max-w-20">
                                            {spell.name}
                                        </div>
                                    </div>
                                </div>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {/* Contenido de la Pasiva */}
                {passive && (
                    <TabsContent value="passive" className="mt-10 py-14">
                        <Card className="bg-card/0 border-none">
                            <CardContent className="p-8">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Columna izquierda: Información básica */}
                                    <div className="lg:w-1/3 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-500/50">
                                                <Image
                                                    src={`${DDRAGON_BASE_URL}/${version}/img/passive/${passive.image.full}`}
                                                    alt={passive.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-beaufort font-bold text-2xl">{passive.name}</div>
                                                <div className="font-spiegel text-sm text-amber-300">Pasiva Innata</div>
                                            </div>
                                        </div>

                                        {/* <div className="bg-amber-900/30 rounded-lg p-4">
                                            <h4 className="font-beaufort font-bold text-lg mb-3">Características</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-spiegel text-amber-200">Tipo</span>
                                                    <span className="font-beaufort font-bold">Pasiva</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-spiegel text-amber-200">No consume</span>
                                                    <span className="font-beaufort font-bold">Recursos</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-spiegel text-amber-200">Sin</span>
                                                    <span className="font-beaufort font-bold">Enfriamiento</span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* Columna derecha: Descripción y análisis */}
                                    <div className="lg:w-2/3 space-y-6">
                                        <div>
                                            <h4 className="font-beaufort font-bold text-xl mb-4">Descripción</h4>
                                            <div
                                                className="font-spiegel text-gray-300 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: passive.description }}
                                            />
                                        </div>

                                        {/* Análisis estratégico */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-gray-800/50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Sword className="w-5 h-5 text-green-400" />
                                                    <h5 className="font-beaufort font-bold">Fortaleza</h5>
                                                </div>
                                                <p className="font-spiegel text-sm text-gray-300">
                                                    Esta pasiva define el estilo de juego de {champion.name},
                                                    proporcionando ventajas únicas en combate.
                                                </p>
                                            </div>

                                            <div className="bg-gray-800/50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                                    <h5 className="font-beaufort font-bold">Contra</h5>
                                                </div>
                                                <p className="font-spiegel text-sm text-gray-300">
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
                        <TabsContent key={spell.id} value={key} className="mt-10 py-14">
                            <Card className="bg-card/0 border-none">
                                <CardContent className="p-8">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        {/* Columna izquierda: Estadísticas */}
                                        <div className="lg:w-1/3 space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/50">
                                                    <Image
                                                        src={`${DDRAGON_BASE_URL}/${version}/img/spell/${spell.image.full}`}
                                                        alt={spell.name}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-beaufort font-bold text-2xl">{spell.name}</div>
                                                    <div className="font-spiegel text-primary font-bold">Tecla: {key}</div>
                                                    <div className="font-spiegel text-sm text-gray-400">
                                                        Nivel máximo: {spell.maxrank}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tipo de recurso */}
                                            {/* <div className="bg-gray-800/50 rounded-lg p-4">
                                                <h5 className="font-beaufort font-bold mb-2">Recurso</h5>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-spiegel text-gray-400">Tipo</span>
                                                    <span className="font-beaufort font-bold">{spell.costType}</span>
                                                </div>
                                                {spell.resource && (
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="font-spiegel text-gray-400">Específico</span>
                                                        <span className="font-beaufort font-bold">{spell.resource}</span>
                                                    </div>
                                                )}
                                            </div> */}

                                            {/* Selector de nivel */}
                                            <div className="bg-secondary/30 rounded-xl p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <BarChart3 className="w-5 h-5 text-primary" />
                                                        <h3 className="font-beaufort font-bold text-lg">Valores por Nivel</h3>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Nivel actual: <span className="text-primary font-bold">{selectedLevel}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    {key === 'R'
                                                        ? levels.slice(0, 3).map(level => (
                                                            <button
                                                                key={level}
                                                                onClick={() => setSelectedLevel(level)}
                                                                className={`flex-1 py-1 rounded-lg font-beaufort font-bold transition-all ${selectedLevel === level ? 'bg-primary/30 text-white' : 'bg-secondary hover:bg-secondary/80'} cursor-pointer`}
                                                            >
                                                                Nv. {level}
                                                            </button>
                                                        ))
                                                        : levels.map(level => (
                                                            <button
                                                                key={level}
                                                                onClick={() => setSelectedLevel(level)}
                                                                className={`flex-1 py-1 rounded-lg font-beaufort font-bold transition-all ${selectedLevel === level ? 'bg-primary/30 text-white' : 'bg-secondary hover:bg-secondary/80'} cursor-pointer`}
                                                            >
                                                                Nv. {level}
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Columna derecha: Información detallada */}
                                        <div className="lg:w-2/3 space-y-6">
                                            {/* Descripción */}
                                            <div>
                                                <h4 className="font-beaufort font-bold text-xl mb-4">Descripción</h4>
                                                <div
                                                    className="font-spiegel text-gray-300 leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: spell.description }}
                                                />

                                            </div>

                                            {/* Tooltip (descripción detallada) */}
                                            {/* {spell.tooltip && (
                                                <div className="bg-gray-800/30 rounded-lg p-6">
                                                    <h5 className="font-beaufort font-bold text-lg mb-3">Detalles Técnicos</h5>
                                                    <div 
                                                        className="font-spiegel text-gray-300 leading-relaxed"
                                                        dangerouslySetInnerHTML={{ __html: spell.tooltip }}
                                                    />
                                                </div>
                                            )} */}

                                            {/* Consejos por nivel */}
                                            {/* {spell.leveltip && (
                                                <div className="bg-linear-to-r from-primary/10 to-transparent rounded-lg p-6">
                                                    <h5 className="font-beaufort font-bold text-lg mb-4">Consejos por Nivel</h5>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {spell.leveltip.label.map((label, i) => (
                                                            <div key={i} className="flex items-start gap-3">
                                                                <ChevronRight className="w-5 h-5 text-primary mt-1 shrink-0" />
                                                                <div>
                                                                    <div className="font-beaufort font-semibold">{label}</div>
                                                                    {spell.leveltip && spell.leveltip.effect[i] && (
                                                                        < div
                                                                            className="font-spiegel text-sm text-gray-400 mt-1"
                                                                            dangerouslySetInnerHTML={{ __html: spell.leveltip.effect[i] }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )} */}

                                            {/* Tabla de escalado */}
                                            {/* {(spell.effect || spell.cooldown) && (
                                                <div className="overflow-hidden rounded-lg border border-gray-700/50">
                                                    <div className="bg-gray-800/80 px-6 py-4 border-b border-gray-700/50">
                                                        <h5 className="font-beaufort font-bold text-lg">Escalado por Nivel</h5>
                                                    </div>
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr className="bg-gray-800/50">
                                                                    <th className="px-4 py-3 text-left font-beaufort font-bold">Nivel</th>
                                                                    {spell.cooldown && (
                                                                        <th className="px-4 py-3 text-left font-beaufort font-bold">
                                                                            Enfriamiento (s)
                                                                        </th>
                                                                    )}
                                                                    {spell.cost && spell.costType !== 'Ninguno' && (
                                                                        <th className="px-4 py-3 text-left font-beaufort font-bold">
                                                                            Coste
                                                                        </th>
                                                                    )}
                                                                    {spell.effect && (
                                                                        <th className="px-4 py-3 text-left font-beaufort font-bold">
                                                                            Valor
                                                                        </th>
                                                                    )}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {levels.map(level => (
                                                                    <tr
                                                                        key={level}
                                                                        className={`border-b border-gray-700/30 ${selectedLevel === level ? 'bg-primary/10' : ''}`}
                                                                    >
                                                                        <td className="px-4 py-3 font-beaufort font-bold">{level}</td>
                                                                        {spell.cooldown && (
                                                                            <td className="px-4 py-3 font-spiegel">
                                                                                {getValueAtLevel(spell.cooldown, level) || 'N/A'}
                                                                            </td>
                                                                        )}
                                                                        {spell.cost && spell.costType !== 'Ninguno' && (
                                                                            <td className="px-4 py-3 font-spiegel">
                                                                                {getValueAtLevel(spell.cost, level) || '0'}
                                                                            </td>
                                                                        )}
                                                                        {spell.effect && spell.effectBurn && (
                                                                            <td className="px-4 py-3 font-spiegel">
                                                                                {spell.effectBurn[level - 1] || 'N/A'}
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )} */}

                                            {/* Stats en tarjetas */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                                                    <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                                    <div className="font-beaufort font-bold text-xl">
                                                        {cooldownAtLevel !== null ? `${cooldownAtLevel}s` : 'N/A'}
                                                    </div>
                                                    <div className="font-spiegel text-xs text-gray-400">Enfriamiento</div>
                                                </div>

                                                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                                                    <Coins className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                                    <div className="font-beaufort font-bold text-xl">
                                                        {costAtLevel !== null ? costAtLevel : '0'}
                                                    </div>
                                                    <div className="font-spiegel text-xs text-gray-400">Coste</div>
                                                </div>

                                                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                                                    <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                                    <div className="font-beaufort font-bold text-xl">
                                                        {rangeAtLevel !== null ? rangeAtLevel : 'Auto'}
                                                    </div>
                                                    <div className="font-spiegel text-xs text-gray-400">Rango</div>
                                                </div>

                                                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                                                    <Layers className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                                    <div className="font-beaufort font-bold text-xl">
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