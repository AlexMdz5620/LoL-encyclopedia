import { Champion } from '@/schemas/champions';
import { 
  Shield, 
  Sword, 
  TrendingUp, 
  Wand2,
} from 'lucide-react';

type SummaryChampionProps = {
    champion: Champion;
    difficultyColorsText: Record<number, string>
}

export default function SummaryChampion({ champion, difficultyColorsText }: SummaryChampionProps) {
    return (
        <div className="space-y-8">
            {/* Sección de Historia */}
            <div className="gap-4 pb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <span className="text-primary font-bold">📖</span>
                    </div>
                    <h2 className="font-beaufort font-bold text-2xl">Historia</h2>
                </div>
                <p className="font-spiegel leading-relaxed text-gray-300">
                    {champion.lore || champion.blurb}
                </p>
            </div>

            {/* Perfil de Combate Mejorado */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-chart-3/20">
                        <span className="text-chart-3 font-bold">⚔️</span>
                    </div>
                    <h2 className="font-beaufort font-bold text-2xl">Perfil de Combate</h2>
                </div>
                
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                    <StatBar 
                        icon={Sword} 
                        label="Ataque" 
                        value={champion.info.attack} 
                        max={10} 
                        color="text-destructive"
                        description="Daño físico y capacidad para eliminar objetivos"
                    />
                    <StatBar 
                        icon={Shield} 
                        label="Defensa" 
                        value={champion.info.defense} 
                        max={10} 
                        color="text-accent"
                        description="Capacidad para sobrevivir al daño recibido"
                    />
                    <StatBar 
                        icon={Wand2} 
                        label="Magia" 
                        value={champion.info.magic} 
                        max={10} 
                        color="text-primary"
                        description="Daño mágico y utilidad de habilidades"
                    />
                    <StatBar 
                        icon={TrendingUp} 
                        label="Dificultad" 
                        value={champion.info.difficulty} 
                        max={10} 
                        color={champion.info.difficulty ? difficultyColorsText[champion.info.difficulty] : 'chart-3'}
                        description="Complejidad para dominar el campeón"
                    />
                </div>

                {/* Resumen del perfil */}
                <div className="mt-6 pt-6 border-t border-border/50">
                    <h4 className="font-beaufort font-semibold text-lg mb-3">Resumen del estilo de juego</h4>
                    <div className="font-spiegel text-sm text-muted-foreground leading-relaxed">
                        {champion.info.attack >= 7 && "• Especializado en infligir daño físico rápido\n"}
                        {champion.info.defense >= 7 && "• Excelente para iniciar peleas y absorber daño\n"}
                        {champion.info.magic >= 7 && "• Habilidades poderosas con alto impacto en equipo\n"}
                        {champion.info.difficulty >= 7 && "• Requiere práctica y buen posicionamiento\n"}
                        {champion.tags.includes('Assassin') && "• Ideal para eliminar objetivos prioritarios\n"}
                        {champion.tags.includes('Tank') && "• Perfecto para proteger a los aliados\n"}
                        {champion.tags.includes('Support') && "• Enfocado en utilidad y control de equipo\n"}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatBarProps {
    icon: React.ElementType;
    label: string;
    value: number;
    max: number;
    color: string;
    description?: string;
}

function StatBar({ icon: Icon, label, value, max, color, description }: StatBarProps) {
    const percentage = (value / max) * 100;
    
    // Color de fondo para la barra (removiendo el "text-" del color)
    const bgColor = color.replace("text-", "bg-");

    return (
        <div className="space-y-3 p-4 bg-secondary/20 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${bgColor}/20`}>
                        <Icon className={`size-5 ${color}`} />
                    </div>
                    <div>
                        <span className="font-beaufort font-bold text-lg text-foreground block">{label}</span>
                        {description && (
                            <span className="font-spiegel text-xs text-muted-foreground block mt-1">
                                {description}
                            </span>
                        )}
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-beaufort font-bold text-2xl block">{value}</span>
                    <span className="font-spiegel text-xs text-muted-foreground">/10</span>
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bajo</span>
                    <span className="text-muted-foreground">Alto</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div
                        className={`h-full ${bgColor} transition-all duration-500 rounded-full`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>2.5</span>
                    <span>5</span>
                    <span>7.5</span>
                    <span>10</span>
                </div>
            </div>
        </div>
    );
}