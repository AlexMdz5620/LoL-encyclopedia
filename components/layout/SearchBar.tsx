import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ChangeEvent } from 'react';

type SearchBarProps = {
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
    placeholder = 'Buscar...',
    value,
    onChange
}: SearchBarProps) {
    return (
        <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-10 bg-card/50 backdrop-blur-sm border-border"
            />
        </div>
    )
}
