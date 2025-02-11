import { NextResponse } from 'next/server';
import Movie from '@/models/movie.model';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const genre = searchParams.get('genre');
        const year = searchParams.get('year');
        const rating = searchParams.get('rating');
        const search = searchParams.get('search');

        let query: any = {};

        if (genre) query.genre = genre;
        if (year) query.year = year;
        if (rating) query.rating = { $gte: rating };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const movies = await Movie.find(query).sort({ createdAt: -1 });

        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json(
            { error: 'Error fetching movies' },
            { status: 500 }
        );
    }
}
