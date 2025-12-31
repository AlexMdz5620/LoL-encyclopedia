import { Card, CardContent } from '@/components/ui/card';
import { Eye, Package, Target, TrendingUp } from 'lucide-react';

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 text-center">
        <h1 className="font-beaufort font-bold text-5xl md:text-7xl mb-3">
          La <span className="text-primary">Enciclopedia</span>
        </h1>
        <h1 className="font-beaufort font-bold text-5xl md:text-7xl mb-6">
          del <span className="text-primary">Invocador</span>
        </h1>
        <p className="font-spiegel text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-3">
          Tu fuente definitiva de información actualizada y herramientas para League of Legends
        </p>
      </section>

      {/* Misión y Visión */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="font-beaufort font-bold text-4xl text-center mb-12">
          Nuestro Propósito
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Misión */}
          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/20">
                  <Target className="size-8 text-primary" />
                </div>
                <h3 className="font-beaufort font-bold text-2xl">Misión</h3>
              </div>
              <p className="font-spiegel text-zinc-300 text-lg leading-relaxed">
                Proporcionar a la comunidad de League of Legends una enciclopedia interactiva
                y actualizada que centralice toda la información relevante del juego de forma
                accesible, precisa y en español. Nos comprometemos a ofrecer datos confiables
                directamente de las fuentes oficiales.
              </p>
            </CardContent>
          </Card>

          {/* Visión */}
          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-accent/20">
                  <Eye className="size-8 text-accent" />
                </div>
                <h3 className="font-beaufort font-bold text-2xl">Visión</h3>
              </div>
              <p className="font-spiegel text-zinc-300 text-lg leading-relaxed">
                Convertirnos en la plataforma de referencia en español para jugadores de
                League of Legends. A través de herramientas innovadoras como la futura
                <span className="font-semibold text-primary"> Calculadora de Stats</span>
                —que permitirá simular el crecimiento de campeones por nivel, equipamiento
                de ítems y efectos de runas— aspiramos a ser el acompañante esencial.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap visual */}
        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="font-beaufort font-bold text-3xl text-center mb-10">
            Próximas Características
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                etapa: "Etapa 1",
                titulo: "Crecimiento por Nivel",
                desc: "Calcula stats base al subir de nivel",
                icon: <TrendingUp />,
                color: "bg-blue-500/20",
                textColor: "text-blue-400",
                finalizado: true,
              },
              {
                etapa: "Etapa 2",
                titulo: "Equipamiento de Ítems",
                desc: "Agrega stats de items a los cálculos",
                icon: <Package />,
                color: "bg-purple-500/20",
                textColor: "text-purple-400",
                finalizado: false
              },
              // {
              //   etapa: "Etapa 3",
              //   titulo: "Runas y Efectos",
              //   desc: "Incluye modificadores de runas",
              //   icon: <Zap />,
              //   color: "bg-amber-500/20",
              //   textColor: "text-amber-400"
              // }
            ].map((item, index) => (
              <div key={index} className={`p-6 rounded-xl border ${item.color} border-zinc-700`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <div className={item.textColor}>{item.icon}</div>
                  </div>
                  <span className={`font-beaufort font-bold ${item.textColor}`}>
                    {item.etapa}
                  </span>
                </div>
                <h4 className="font-beaufort font-bold text-xl mb-2">{item.titulo}</h4>
                <p className="font-spiegel text-zinc-400">{item.desc}</p>
                {item.finalizado && (
                  <>
                    <h4 className="font-beaufort font-bold text-xl my-2">¡Finalizado!</h4>
                    <p className="font-spiegel text-zinc-400">Ya puedes verlo en el apartado de Estadísticas de los Campeones</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
