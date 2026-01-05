import { Champion } from '@/schemas/champions';
import { AlertTriangle, ShieldOff, ZapOff, EyeOff, Clock } from 'lucide-react';

type EnemyTipsChampionProps = {
    champion: Champion;
}

export default function EnemyTipsChampion({ champion }: EnemyTipsChampionProps) {
    if (!champion.enemytips || champion.enemytips.length === 0) {
        return (
            <div className="text-center py-12 px-4">
                <p className="text-gray-400">No hay contramedidas disponibles para este campeón</p>
            </div>
        );
    }

    const categorizeTip = (tip: string) => {
        const tipLower = tip.toLowerCase();
        if (tipLower.includes('cooldown') || tipLower.includes('enfriamiento') || tipLower.includes('esperar'))
            return { type: 'Cooldown', icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-blue-400' };
        if (tipLower.includes('defensa') || tipLower.includes('debilitar') || tipLower.includes('vulnerable'))
            return { type: 'Debilidad', icon: <ShieldOff className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-red-400' };
        if (tipLower.includes('habilidad') || tipLower.includes('hechizo') || tipLower.includes('evitar'))
            return { type: 'Habilidad', icon: <ZapOff className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-yellow-400' };
        if (tipLower.includes('vision') || tipLower.includes('visión') || tipLower.includes('detectar'))
            return { type: 'Visión', icon: <EyeOff className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-purple-400' };
        return { type: 'General', icon: <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-gray-400' };
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="space-y-3 md:space-y-4 px-4 md:px-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/20 shrink-0">
                        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                    </div>
                    <div>
                        <h2 className="font-beaufort font-bold text-xl md:text-2xl">Contramedidas</h2>
                        <p className="font-spiegel text-xs md:text-sm text-muted-foreground">
                            Cómo enfrentar a {champion.name}
                        </p>
                    </div>
                </div>

                {/* Análisis rápido de debilidades - Grid Responsivo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <div className="bg-destructive/10 rounded-lg p-3 md:p-4">
                        <div className="font-beaufort font-bold text-lg md:text-xl text-destructive mb-1 md:mb-2">
                            Debilidades Principales
                        </div>
                        <ul className="font-spiegel text-xs md:text-sm space-y-0.5 md:space-y-1">
                            {champion.info.defense <= 4 && <li>• Poca resistencia física</li>}
                            {champion.info.magic <= 4 && <li>• Baja utilidad mágica</li>}
                            {champion.stats.movespeed <= 330 && <li>• Movimiento lento</li>}
                            {champion.info.difficulty >= 7 && <li>• Dificultad alta</li>}
                        </ul>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-3 md:p-4">
                        <div className="font-beaufort font-bold text-lg md:text-xl text-accent mb-1 md:mb-2">
                            Fortalezas a Neutralizar
                        </div>
                        <ul className="font-spiegel text-xs md:text-sm space-y-0.5 md:space-y-1">
                            {champion.info.attack >= 7 && <li>• Alto daño físico</li>}
                            {champion.info.magic >= 7 && <li>• Buen control mágico</li>}
                            {champion.info.defense >= 7 && <li>• Gran resistencia</li>}
                            {champion.stats.movespeed >= 345 && <li>• Movimiento rápido</li>}
                        </ul>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-3 md:p-4 sm:col-span-2 lg:col-span-1">
                        <div className="font-beaufort font-bold text-lg md:text-xl text-primary mb-1 md:mb-2">
                            Tácticas Recomendadas
                        </div>
                        <div className="font-spiegel text-xs md:text-sm space-y-1">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${champion.info.difficulty >= 7 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                {champion.info.difficulty >= 7 ? 'Aprovecha errores' : 'Presión constante'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de contramedidas */}
            <div className="space-y-4 md:space-y-6 px-4 md:px-0">
                <h3 className="font-beaufort font-bold text-lg md:text-xl px-2 md:px-0">
                    Estrategias para contrarrestar a {champion.name}
                </h3>

                <div className="space-y-3 md:space-y-4">
                    {champion.enemytips.map((tip, index) => {
                        const category = categorizeTip(tip);

                        return (
                            <div
                                key={index}
                                className="bg-linear-to-r from-destructive/10 to-transparent border-l-2 md:border-l-4 border-destructive rounded-r-lg p-3 md:p-5 hover:border-l-3 md:hover:border-l-8 transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="shrink-0">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${category.color.replace('text', 'bg')}/20 flex items-center justify-center`}>
                                            {category.icon}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 md:mb-2 gap-1 md:gap-0">
                                            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                                <span className={`font-beaufort font-semibold text-xs md:text-sm ${category.color}`}>
                                                    {category.type}
                                                </span>
                                                <span className="font-beaufort font-bold text-base md:text-lg">
                                                    Contramedida {index + 1}
                                                </span>
                                            </div>
                                            <span className="font-spiegel text-xs text-muted-foreground">
                                                Prioridad: {index < 3 ? 'Alta' : 'Media'}
                                            </span>
                                        </div>

                                        <p className="font-spiegel text-sm md:text-base text-gray-300 leading-relaxed">
                                            {tip}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Resumen táctico */}
            <div className="bg-linear-to-r from-destructive/10 to-accent/10 rounded-xl p-4 md:p-6 border border-destructive/30 mx-4 md:mx-0">
                <h3 className="font-beaufort font-bold text-lg md:text-xl mb-3 md:mb-4">Resumen Táctico</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="space-y-2 md:space-y-3">
                        <h4 className="font-beaufort font-semibold text-destructive text-base md:text-lg">Evitar</h4>
                        <ul className="font-spiegel text-xs md:text-sm space-y-1 md:space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-destructive mt-1 md:mt-1.5 shrink-0" />
                                <span>Peleas prolongadas con {champion.name}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-destructive mt-1 md:mt-1.5 shrink-0" />
                                <span>Quedar aislado vs este campeón</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                        <h4 className="font-beaufort font-semibold text-accent text-base md:text-lg">Explotar</h4>
                        <ul className="font-spiegel text-xs md:text-sm space-y-1 md:space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent mt-1 md:mt-1.5 shrink-0" />
                                <span>Periodos de cooldown de habilidades</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent mt-1 md:mt-1.5 shrink-0" />
                                <span>Debilidades en {champion.partype === 'Ninguno' ? 'recursos' : champion.partype.toLowerCase()}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2 md:space-y-3 sm:col-span-2 lg:col-span-1">
                        <h4 className="font-beaufort font-semibold text-primary text-base md:text-lg">Recomendado</h4>
                        <ul className="font-spiegel text-xs md:text-sm space-y-1 md:space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary mt-1 md:mt-1.5 shrink-0" />
                                <span>Control de visión y posición</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary mt-1 md:mt-1.5 shrink-0" />
                                <span>Coordinación con el equipo</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}