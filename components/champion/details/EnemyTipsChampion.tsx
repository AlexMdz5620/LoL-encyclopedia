import { Champion } from '@/schemas/champions';
import { AlertTriangle, ShieldOff, ZapOff, EyeOff, Clock } from 'lucide-react';

type EnemyTipsChampionProps = {
    champion: Champion;
}

export default function EnemyTipsChampion({ champion }: EnemyTipsChampionProps) {
    // Verificar si hay consejos
    if (!champion.enemytips || champion.enemytips.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No hay contramedidas disponibles para este campeón</p>
            </div>
        );
    }

    // Categorizar consejos por tipo
    const categorizeTip = (tip: string) => {
        const tipLower = tip.toLowerCase();
        if (tipLower.includes('cooldown') || tipLower.includes('enfriamiento') || tipLower.includes('esperar'))
            return { type: 'Cooldown', icon: <Clock className="w-5 h-5" />, color: 'text-blue-400' };
        if (tipLower.includes('defensa') || tipLower.includes('debilitar') || tipLower.includes('vulnerable'))
            return { type: 'Debilidad', icon: <ShieldOff className="w-5 h-5" />, color: 'text-red-400' };
        if (tipLower.includes('habilidad') || tipLower.includes('hechizo') || tipLower.includes('evitar'))
            return { type: 'Habilidad', icon: <ZapOff className="w-5 h-5" />, color: 'text-yellow-400' };
        if (tipLower.includes('vision') || tipLower.includes('visión') || tipLower.includes('detectar'))
            return { type: 'Visión', icon: <EyeOff className="w-5 h-5" />, color: 'text-purple-400' };
        return { type: 'General', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-gray-400' };
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/20">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                        <h2 className="font-beaufort font-bold text-2xl">Contramedidas</h2>
                        <p className="font-spiegel text-sm text-muted-foreground">
                            Cómo enfrentar a {champion.name}
                        </p>
                    </div>
                </div>

                {/* Análisis rápido de debilidades */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-destructive/10 rounded-lg p-4">
                        <div className="font-beaufort font-bold text-xl text-destructive mb-2">
                            Debilidades Principales
                        </div>
                        <ul className="font-spiegel text-sm space-y-1">
                            {champion.info.defense <= 4 && <li>• Poca resistencia física</li>}
                            {champion.info.magic <= 4 && <li>• Baja utilidad mágica</li>}
                            {champion.stats.movespeed <= 330 && <li>• Movimiento lento</li>}
                            {champion.info.difficulty >= 7 && <li>• Dificultad alta</li>}
                        </ul>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-4">
                        <div className="font-beaufort font-bold text-xl text-accent mb-2">
                            Fortalezas a Neutralizar
                        </div>
                        <ul className="font-spiegel text-sm space-y-1">
                            {champion.info.attack >= 7 && <li>• Alto daño físico</li>}
                            {champion.info.magic >= 7 && <li>• Buen control mágico</li>}
                            {champion.info.defense >= 7 && <li>• Gran resistencia</li>}
                            {champion.stats.movespeed >= 345 && <li>• Movimiento rápido</li>}
                        </ul>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 md:col-span-1">
                        <div className="font-beaufort font-bold text-xl text-primary mb-2">
                            Tácticas Recomendadas
                        </div>
                        <div className="font-spiegel text-sm">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${champion.info.difficulty >= 7 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                {champion.info.difficulty >= 7 ? 'Aprovecha errores' : 'Presión constante'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de contramedidas */}
            <div className="space-y-6">
                <h3 className="font-beaufort font-bold text-xl">
                    Estrategias para contrarrestar a {champion.name}
                </h3>

                <div className="grid gap-4">
                    {champion.enemytips.map((tip, index) => {
                        const category = categorizeTip(tip);

                        return (
                            <div
                                key={index}
                                className="bg-linear-to-r from-destructive/10 to-transparent border-l-4 border-destructive rounded-r-lg p-5 hover:border-l-8 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0">
                                        <div className={`w-10 h-10 rounded-lg ${category.color.replace('text', 'bg')}/20 flex items-center justify-center`}>
                                            {category.icon}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-beaufort font-semibold ${category.color}`}>
                                                    {category.type}
                                                </span>
                                                <span className="font-beaufort font-bold text-lg">
                                                    Contramedida {index + 1}
                                                </span>
                                            </div>
                                            <span className="font-spiegel text-sm text-muted-foreground">
                                                Prioridad: {index < 3 ? 'Alta' : 'Media'}
                                            </span>
                                        </div>

                                        <p className="font-spiegel text-gray-300 leading-relaxed">
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
            <div className="bg-linear-to-r from-destructive/10 to-accent/10 rounded-xl p-6 border border-destructive/30">
                <h3 className="font-beaufort font-bold text-xl mb-4">Resumen Táctico</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h4 className="font-beaufort font-semibold text-destructive">Evitar</h4>
                        <ul className="font-spiegel text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-destructive mt-1" />
                                Peleas prolongadas con {champion.name}
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-destructive mt-1" />
                                Quedar aislado vs este campeón
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-beaufort font-semibold text-accent">Explotar</h4>
                        <ul className="font-spiegel text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent mt-1" />
                                Periodos de cooldown de habilidades
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent mt-1" />
                                Debilidades en {champion.partype === 'Ninguno' ? 'recursos' : champion.partype.toLowerCase()}
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-beaufort font-semibold text-primary">Recomendado</h4>
                        <ul className="font-spiegel text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                                Control de visión y posición
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                                Coordinación con el equipo
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}