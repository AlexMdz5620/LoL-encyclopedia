import { Champion } from '@/schemas/champions'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image';
import { DDRAGON_BASE_URL } from '@/lib/ddragon';
import Link from 'next/link';

type ChampionCardProps = {
    champion: Champion
}

export default function ChampionCard({ champion }: ChampionCardProps) {
    return (
        <Link href={`/champions/${champion.id}`}>
            <Card
                className="group cursor-pointer hover:border-primary transition-all duration-500 hover:scale-105 overflow-hidden bg-card backdrop-blur-sm h-100"
            >
                <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                        <Image
                            src={`${DDRAGON_BASE_URL}/img/champion/loading/${champion.id}_0.jpg` || "/placeholder.svg"}
                            alt={champion.name}
                            fill
                            className="object-cover transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <h3 className="font-bold text-foreground text-sm mb-1">{champion.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-1">{champion.title}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
