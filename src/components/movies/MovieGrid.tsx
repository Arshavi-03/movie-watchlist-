// components/movies/MovieGrid.tsx
import { ReactNode } from 'react';

interface MovieGridProps {
    children: ReactNode;
}

export function MovieGrid({ children }: MovieGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {children}
        </div>
    );
}