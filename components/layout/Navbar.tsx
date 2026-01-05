"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Sparkles, Sword } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/champions', label: 'Campeones', icon: Shield },
    { href: '/items', label: 'Items', icon: Sword },
    { href: '/runes', label: 'Runas', icon: Sparkles },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isChampionPage = pathname === '/champions';
    const isItemsPage = pathname === '/items';
    const isRunesPage = pathname === '/runes';

    const bgCard = isHomePage || isChampionPage || isItemsPage || isRunesPage;

    return (
        <nav
            className={`${bgCard ? 'border-b border-border' : 'border-none'} ${bgCard ? 'bg-card/50' : 'bg-card/05'} backdrop-blur-sm sticky top-0 z-50`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <div className="relative flex items-center">
                            <Image
                                className="p-2 m-1 rounded-2xl"
                                src="/the_Summoner's_Encyclopedia.png"
                                alt="The Summoner's Encyclopedia logo"
                                width={60}
                                height={60}
                                priority
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '60px',
                                    maxHeight: '60px'
                                }}
                            />
                        </div>
                    </Link>
                    <div className="flex gap-1">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                    )}
                                    title={item.label} // Tooltip para mobile
                                >
                                    <Icon className='size-4' />
                                    <span className='font-medium hidden sm:inline'>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}
