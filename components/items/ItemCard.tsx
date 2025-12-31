"use client";

import { Item, Items } from '@/schemas/items';
import { useMemo, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { DDRAGON_BASE_URL } from '@/lib/ddragon';
import { Coins } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';

type ItemCardProps = {
  item: Item;
  items: Items;
  version: string;
};

export default function ItemCard({ item, items, version }: ItemCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  function findItemById(items: Items, id: string): Item | undefined {
    return items.find(item => item.id === id);
  }

  const intoItems = useMemo(() => {
    if (!item.into || item.into.length === 0) return [];
    return item.into
      .map(id => findItemById(items, id))
      .filter(Boolean) as Items;
  }, [item.into, items]);

  const fromItems = useMemo(() => {
    if (!item.from || item.from.length === 0) return [];
    return item.from
      .map(id => findItemById(items, id))
      .filter(Boolean) as Items;
  }, [item.from, items]);

  return (
    <>
      <Card
        className="group cursor-pointer hover:border-primary transition-all duration-300 hover:scale-105 overflow-hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="p-2">
          <div className="relative aspect-square overflow-hidden rounded-md bg-secondary/50">
            <Image
              src={`${DDRAGON_BASE_URL}/${version}/img/item/${item.image.full}` || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-xs text-foreground line-clamp-1">{item.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Coins className="size-3 text-primary" />
              <span className="text-xs text-muted-foreground">{item.gold.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="relative size-20 rounded-lg overflow-hidden bg-secondary/50 shrink-0">
                <Image
                  src={`${DDRAGON_BASE_URL}/${version}/img/item/${item.image.full}` || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-2xl mb-1">{item.name}</DialogTitle>
                {item.plaintext && <p className="text-muted-foreground text-sm">{item.plaintext}</p>}
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.translatedStats.map((tag) => (
                    <Badge key={tag.key} variant="secondary">
                      {tag.translatedName}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Costo Total</p>
                <div className="flex items-center gap-1">
                  <Coins className="size-4 text-primary" />
                  <span className="font-bold text-foreground">{item.gold.total}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Costo Base</p>
                <div className="flex items-center gap-1">
                  <Coins className="size-4 text-accent" />
                  <span className="font-bold text-foreground">{item.gold.base}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Se Vende por</p>
                <div className="flex items-center gap-1">
                  <Coins className="size-4 text-muted-foreground" />
                  <span className="font-bold text-foreground">{item.gold.sell}</span>
                </div>
              </div>
            </div>

            {item.description && (
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Descripción</h4>
                <div
                  className="text-sm text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            )}

            {Object.keys(item.translatedStats).length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Estadísticas</h4>
                <div className="grid grid-cols-2 gap-3">
                  {item.translatedStats.map((i) => (
                    <div key={i.key} className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                      <span className="text-sm text-muted-foreground capitalize">
                        {i.translatedName.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-semibold text-primary">+{i.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {intoItems.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Se construye a:</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {intoItems.map(intoItem => (
                    <div key={intoItem.id} className="flex flex-col items-center">
                      <div className="relative size-12 rounded-md overflow-hidden bg-secondary/50 mb-1">
                        <Image
                          src={`${DDRAGON_BASE_URL}/${version}/img/item/${intoItem.image.full}`}
                          alt={intoItem.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <span className="text-xs text-center text-muted-foreground line-clamp-2">
                        {intoItem.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {fromItems.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Se construye con:</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {fromItems.map(fromItem => (
                    <div key={fromItem.id} className="flex flex-col items-center">
                      <div className="relative size-12 rounded-md overflow-hidden bg-secondary/50 mb-1">
                        <Image
                          src={`${DDRAGON_BASE_URL}/${version}/img/item/${fromItem.image.full}`}
                          alt={fromItem.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <span className="text-xs text-center text-muted-foreground line-clamp-2">
                        {fromItem.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
