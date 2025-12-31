import { Rune } from '@/schemas/runes'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { getRuneImageUrl } from '@/services/runes';
import RuneCard from './RuneCard';

type RuneTreeProps = {
  rune: Rune;
}

export default function RuneTree({ rune }: RuneTreeProps) {
  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="relative size-12 shrink-0">
            <Image
              src={
                getRuneImageUrl(rune.icon) ||
                "/placeholder.svg"
              }
              alt={rune.name}
              fill
              className="object-contain"
            />
          </div>
          <CardTitle className="text-xl text-foreground">{rune.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {rune.slots.map((slot, slotIndex) => (
          <div key={slotIndex} className="space-y-2">
            {slotIndex === 0 && <p className="text-xs font-semibold text-primary uppercase tracking-wide">Piedras Claves (Keystone)</p>}
            {slotIndex === 1 && <p className="text-xs font-semibold text-accent uppercase tracking-wide">Espacio 1</p>}
            {slotIndex === 2 && <p className="text-xs font-semibold text-accent uppercase tracking-wide">Espacio 2</p>}
            {slotIndex === 3 && <p className="text-xs font-semibold text-accent uppercase tracking-wide">Espacio 3</p>}
            <div className="grid grid-cols-3 gap-2">
              {slot.runes.map((rune) => (
                <RuneCard key={rune.id} rune={rune} isKeystone={slotIndex === 0} />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
