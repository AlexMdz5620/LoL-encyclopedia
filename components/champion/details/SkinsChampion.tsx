import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { DDRAGON_BASE_URL } from '@/lib/ddragon';
import { Champion } from '@/schemas/champions';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';
import { useState } from 'react';

type SkinsChampionProps = {
    champion: Champion;
}

export default function SkinsChampion({ champion }: SkinsChampionProps) {
    const [activeSkinIndex, setActiveSkinIndex] = useState(0);
    const skins = champion.skins || [];

    if (skins.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No hay aspectos disponibles para este campeón</p>
            </div>
        );
    }

    const currentSkin = skins[activeSkinIndex];
    const skinImgLarge = `${DDRAGON_BASE_URL}/img/champion/splash/${champion.id}_${currentSkin.num}.jpg`;

    return (
        <div className="space-y-8">
            {/* Header simple */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                    <Palette className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className="font-beaufort font-bold text-2xl">Aspectos</h2>
                    <p className="font-spiegel text-sm text-muted-foreground">
                        {activeSkinIndex + 1} de {skins.length} - {activeSkinIndex === 0 ? champion.name : currentSkin.name}
                    </p>
                </div>
            </div>

            {/* Carrusel GRANDE - Vista principal */}
            <div className="space-y-4">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary/20 bg-black">
                    <Image
                        src={skinImgLarge}
                        alt={activeSkinIndex === 0 ? champion.name : currentSkin.name}
                        fill
                        className="object-cover"
                        priority={activeSkinIndex === 0}
                        sizes="100vw"
                    />
                    
                    {/* Overlay de información en la imagen grande */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-6">
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="font-beaufort md:font-bold text-xl md:text-2xl text-white">
                                    {activeSkinIndex === 0 ? champion.name : currentSkin.name}
                                </h3>
                                <p className="text-sm font-spiegel text-gray-300">
                                    Número: {currentSkin.num} {currentSkin.chromas && '• Con Cromas'}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="font-beaufort font-bold md:text-3xl text-primary">
                                    {activeSkinIndex + 1}/{skins.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controles de navegación para el carrusel grande */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => setActiveSkinIndex(prev => (prev > 0 ? prev - 1 : skins.length - 1))}
                        className="p-1 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 transition-colors"
                    >
                        <ArrowLeft height={15} />
                    </button>
                    
                    <div className="flex gap-1">
                        {skins.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSkinIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === activeSkinIndex ? 'bg-primary w-8' : 'bg-gray-600 hover:bg-gray-500'}`}
                            />
                        ))}
                    </div>
                    
                    <button
                        onClick={() => setActiveSkinIndex(prev => (prev < skins.length - 1 ? prev + 1 : 0))}
                        className="p-1 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 transition-colors"
                    >
                        <ArrowRight height={15} />
                    </button>
                </div>
            </div>

            {/* Carrusel PEQUEÑO - Miniaturas para selección */}
            <div className="space-y-4">
                <h3 className="font-beaufort font-bold text-xl">Seleccionar Aspecto</h3>
                
                <Carousel className="w-full">
                    <CarouselContent>
                        {skins.map((skin, index) => {
                            const skinImgThumb = `${DDRAGON_BASE_URL}/img/champion/loading/${champion.id}_${skin.num}.jpg`;
                            const isActive = index === activeSkinIndex;
                            
                            return (
                                <CarouselItem 
                                    key={skin.id} 
                                    className="basis-1/3 md:basis-1/4 lg:basis-1/6"
                                >
                                    <button
                                        onClick={() => setActiveSkinIndex(index)}
                                        className={`w-full relative aspect-3/4 rounded-xl overflow-hidden border-2 transition-all ${isActive ? 'border-primary scale-105' : 'border-gray-700 hover:border-gray-500 hover:scale-105'}`}
                                    >
                                        <Image
                                            src={skinImgThumb}
                                            alt={index === 0 ? champion.name : skin.name}
                                            fill
                                            className="object-cover"
                                        />
                                        
                                        {/* Indicador de selección */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-primary/20" />
                                        )}
                                        
                                        {/* Número de skin en la esquina */}
                                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            #{skin.num}
                                        </div>
                                    </button>
                                    
                                    {/* Nombre de la skin debajo de la miniatura */}
                                    <p className="font-spiegel text-sm text-center mt-2 truncate">
                                        {index === 0 ? champion.name : skin.name}
                                    </p>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <CarouselPrevious className="static translate-y-0 bg-gray-800/80 hover:bg-gray-700 border-gray-700" />
                        <div className="font-spiegel text-sm text-muted-foreground">
                            Desliza para ver más miniaturas
                        </div>
                        <CarouselNext className="static translate-y-0 bg-gray-800/80 hover:bg-gray-700 border-gray-700" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}