import { getRuneImageUrl } from '@/services/runes'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Badge } from '../ui/badge'

type RuneCardProps = {
    rune: {
        id: number
        key: string
        icon: string
        name: string
        shortDesc: string
        longDesc: string
    }
    isKeystone: boolean;
}
export default function RuneCard({ rune, isKeystone }: RuneCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative aspect-square p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105 border border-border hover:border-primary"
            >
                <div className="relative size-full">
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
                {isKeystone && (
                    <div className="absolute -top-1 -right-1 size-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary-foreground">K</span>
                    </div>
                )}
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-start gap-4">
                            <div className="relative size-16 shrink-0">
                                <Image
                                    src={getRuneImageUrl(rune.icon) || "/placeholder.svg"}
                                    alt={rune.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <DialogTitle className="text-2xl mb-2">{rune.name}</DialogTitle>
                                {isKeystone && (
                                    <Badge variant="default" className="mb-2">
                                        Piedra Clave
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 mt-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-foreground">Descripción</h4>
                            <div
                                className="text-sm text-muted-foreground leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: rune.longDesc }}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
