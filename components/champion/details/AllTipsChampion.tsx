/* eslint-disable react/jsx-key */
import { Champion } from '@/schemas/champions';
import { Users, Target, Shield, Zap, Heart, TrendingUp } from 'lucide-react';

type AllTipsChampionProps = {
  champion: Champion;
}

export default function AllTipsChampion({ champion }: AllTipsChampionProps) {
  // Verificar si hay consejos
  if (!champion.allytips || champion.allytips.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay estrategias disponibles para este campeón</p>
      </div>
    );
  }

  // Iconos para diferentes tipos de consejos
  const getTipIcon = (tip: string, index: number) => {
    const tipLower = tip.toLowerCase();
    const icons = [
      <Target className="w-5 h-5" />,
      <Shield className="w-5 h-5" />,
      <Zap className="w-5 h-5" />,
      <Heart className="w-5 h-5" />,
      <TrendingUp className="w-5 h-5" />
    ];
    
    if (tipLower.includes('combo') || tipLower.includes('combinación')) return icons[0];
    if (tipLower.includes('defensa') || tipLower.includes('proteger')) return icons[1];
    if (tipLower.includes('habilidad') || tipLower.includes('hechizo')) return icons[2];
    if (tipLower.includes('vida') || tipLower.includes('curar')) return icons[3];
    return icons[index % icons.length];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-beaufort font-bold text-2xl">Estrategias Aliadas</h2>
            <p className="font-spiegel text-sm text-muted-foreground">
              Cómo jugar con {champion.name} en tu equipo
            </p>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-secondary/30 rounded-lg p-4 text-center">
            <div className="font-beaufort font-bold text-2xl text-primary">
              {champion.allytips.length}
            </div>
            <div className="font-spiegel text-sm text-muted-foreground">Estrategias</div>
          </div>
          
          <div className="bg-secondary/30 rounded-lg p-4 text-center">
            <div className="font-beaufort font-bold text-2xl text-chart-2">
              {champion.tags.length}
            </div>
            <div className="font-spiegel text-sm text-muted-foreground">Roles</div>
          </div>
          
          <div className="bg-secondary/30 rounded-lg p-4 text-center">
            <div className="font-beaufort font-bold text-2xl text-chart-3">
              {champion.info.difficulty}
            </div>
            <div className="font-spiegel text-sm text-muted-foreground">Dificultad</div>
          </div>
          
          <div className="bg-secondary/30 rounded-lg p-4 text-center">
            <div className="font-beaufort font-bold text-2xl text-accent">
              {champion.partype}
            </div>
            <div className="font-spiegel text-sm text-muted-foreground">Recurso</div>
          </div>
        </div>
      </div>

      {/* Lista de estrategias */}
      <div className="space-y-6">
        <h3 className="font-beaufort font-bold text-xl">
          Consejos para jugar con {champion.name}
        </h3>
        
        <div className="grid gap-4">
          {champion.allytips.map((tip, index) => (
            <div 
              key={index} 
              className="bg-linear-to-r from-secondary/30 to-transparent border-l-4 border-primary rounded-r-lg p-5 hover:border-l-8 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getTipIcon(tip, index)}
                    <span className="font-beaufort font-semibold text-lg">
                      Estrategia {index + 1}
                    </span>
                  </div>
                  <p className="font-spiegel text-gray-300 leading-relaxed">
                    {tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de sinergias */}
      <div className="bg-linear-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
        <h3 className="font-beaufort font-bold text-xl mb-4">Resumen de Sinergias</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {champion.tags.map((tag) => (
            <div key={tag} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <h4 className="font-beaufort font-semibold">{tag}</h4>
              </div>
              <p className="font-spiegel text-sm text-gray-400">
                {tag === 'Assassin' && 'Ideal para eliminar objetivos prioritarios rápidamente.'}
                {tag === 'Fighter' && 'Excelente en peleas prolongadas y combates cuerpo a cuerpo.'}
                {tag === 'Mage' && 'Proporciona daño mágico y control de zonas desde la distancia.'}
                {tag === 'Marksman' && 'Daño constante a distancia, necesita protección.'}
                {tag === 'Support' && 'Enfocado en utilidad, curación y protección de aliados.'}
                {tag === 'Tank' && 'Absorbe daño y inicia peleas para el equipo.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}