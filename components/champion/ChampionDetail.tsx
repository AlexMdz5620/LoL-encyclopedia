'use client';

import { Champion } from '@/schemas/champions';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { DDRAGON_BASE_URL, urlImgChampion } from '@/lib/ddragon';
import { useLoLStore } from '@/stores';
import SummaryChampion from './details/SummaryChampion';
import AllTipsChampion from './details/AllTipsChampion';
import AbilitiesChampion from './details/AbilitiesChampion';
import EnemyTipsChampion from './details/EnemyTipsChampion';
import SkinsChampion from './details/SkinsChampion';
import StatsChampion from './details/StatsChampion';

type ChampionDetailProps = {
    champion: Champion;
}

export default function ChampionDetail({ champion }: ChampionDetailProps) {
    const { version } = useLoLStore();
    const splashArtUrl = `${urlImgChampion}/splash/${champion.id}_0.jpg`;
    const championSquareUrl = `${DDRAGON_BASE_URL}/${version}/img/champion/${champion.image.full}`;

    const tabs = [
        { name: 'Resumen', value: 'overview' },
        { name: 'Habilidades', value: 'abilities' },
        { name: 'Aspectos', value: 'skins' },
        { name: 'Estadísticas', value: 'stats' },
        { name: 'Estrategias Aliadas', value: 'alltips' },
        { name: 'Contramedidas', value: 'enemytips' },
    ];

    const difficultyColorsText: Record<number, string> = {
        1: "text-emerald-400",
        2: "text-emerald-400",
        3: "text-blue-400",
        4: "text-yellow-400",
        5: "text-orange-400",
        6: "text-orange-400",
        7: "text-red-400",
        8: "text-red-400",
        9: "text-purple-400",
        10: "text-purple-400"
    };

    const difficultyColorsBg: Record<number, string> = {
        1: "bg-emerald-400 border-emerald-400",
        2: "bg-emerald-400 border-emerald-400",
        3: "bg-blue-400 border-blue-400",
        4: "bg-yellow-400 border-yellow-400",
        5: "bg-orange-400 border-orange-400",
        6: "bg-orange-400 border-orange-400",
        7: "bg-red-400 border-red-400",
        8: "bg-red-400 border-red-400",
        9: "bg-purple-400 border-purple-400",
        10: "bg-purple-400 border-purple-400"
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="fixed inset-0 z-0">
                {/* Splash Art con efecto parallax */}
                <div className="absolute inset-0">
                    <Image
                        src={splashArtUrl}
                        alt={`${champion.name} splash art`}
                        fill
                        priority
                        className="object-cover object-center scale-105"
                        quality={90}
                        sizes="100vw"
                    />
                </div>

                {/* Overlay con gradiente épico */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/70" />
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />

                {/* Efectos de partículas sutiles */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-black/20 to-black" />
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 relative z-10">
                {/* Columna izquierda - Fija en desktop */}
                <div className="lg:sticky lg:top-8 lg:h-fit lg:py-7">
                    <Card className="overflow-hidden bg-card/0 border-none">
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mx-auto lg:mx-0">
                            <div className="absolute inset-0 bg-linear-to-br from-amber-500 via-yellow-600 to-amber-800 rounded-full p-1">
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-900">
                                    <Image
                                        src={championSquareUrl}
                                        alt={champion.name}
                                        fill
                                        className="object-cover scale-110"
                                        priority
                                    />
                                </div>
                            </div>
                            {/* Efecto de brillo */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-400/20 to-transparent animate-pulse rounded-full" />
                        </div>
                        <CardContent className="flex flex-col text-center pl-6 pb-6">
                            <h1 className="font-beaufort font-bold text-3xl">{champion.name}</h1>
                            <p className="font-spiegel text-lg text-muted-foreground italic">{champion.title}</p>

                            <div className="mt-2 space-y-4">
                                <div>
                                    <h3 className="font-beaufort font-bold">Roles</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {champion.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className={`font-beaufort font-bold ${difficultyColorsText[champion.info.difficulty]}`}>Dificultad</div>
                                    <div className='font-bold'>
                                        {champion.info.difficulty}/10
                                    </div>
                                    <div className="flex mx-auto">
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1 w-4 mx-0.5 rounded-full ${i < champion.info.difficulty ?
                                                    difficultyColorsBg[champion.info.difficulty].split(' ')[0] :
                                                    'bg-gray-700'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Columna derecha: Contenido principal */}
                <div className="lg:col-span-3">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className='bg-card/5 flex-wrap pb-2 h-fit space-x-1'>
                            {tabs.map(tab => (
                                <TabsTrigger
                                    key={tab.name}
                                    value={tab.value}
                                    className='hover:cursor-pointer data-[state=active]:bg-primary/30
                                             data-[state=active]:shadow-lg data-[state=active]:shadow-primary/15
                                             hover:bg-gray-800/50 transition-all duration-300 p-1 rounded-xl
                                             font-beaufort font-bold text-sm md:text-base'
                                >
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="overview">
                            <Card className='bg-card/5 border-none'>
                                <CardContent className="p-6">
                                    <SummaryChampion champion={champion} difficultyColorsText={difficultyColorsText} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="abilities">
                            <Card className='bg-card/5 border-none'>
                                <CardContent className="p-6">
                                    <AbilitiesChampion champion={champion} version={version} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="skins">
                            <Card className='bg-card/5 border-none'>
                                <CardContent className="p-6">
                                    <SkinsChampion champion={champion} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="stats">
                            <Card className='bg-card/5 border-none'>
                                <CardContent className="p-6">
                                    <StatsChampion champion={champion} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='alltips'>
                            <Card className='bg-card/5 border-none'>
                                <CardContent className="p-6">
                                    <AllTipsChampion champion={champion} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='enemytips'>
                            <Card className='bg-card/5 border-none'>
                                <CardContent className="p-6">
                                    <EnemyTipsChampion champion={champion} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div >
    );
}