// app/api/movies/[id]/route.ts
import { NextResponse } from 'next/server';
import Movie from '@/models/movie.model';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const movie = await Movie.findById(params.id);

        if (!movie) {
            return NextResponse.json(
                { error: 'Movie not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        return NextResponse.json(
            { error: 'Error fetching movie' },
            { status: 500 }
        );
    }
}