// app/api/movies/search/route.ts
import { NextResponse } from 'next/server';
import  dbConnect  from '../../../../lib/mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        const genre = searchParams.get('genre') || '';
        const year = searchParams.get('year') || '';
        const rating = searchParams.get('rating') || '';
        const sortBy = searchParams.get('sortBy') || 'popularity';

        const { db } = await dbConnect();

        // Build the filter object
        const filter: any = {};
        
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } },
                { director: { $regex: query, $options: 'i' } },
                { cast: { $regex: query, $options: 'i' } }
            ];
        }

        if (genre) {
            filter.genre = { $regex: new RegExp(`^${genre}$`, 'i') };
        }

        if (year) {
            filter.year = year;
        }

        if (rating) {
            filter.rating = { $gte: parseFloat(rating) };
        }

        // Build the sort object
        let sort: any = {};
        switch (sortBy) {
            case 'rating':
                sort = { rating: -1 };
                break;
            case 'latest':
                sort = { year: -1 };
                break;
            case 'title':
                sort = { title: 1 };
                break;
            default:
                sort = { popularity: -1 };
        }

        const movies = await db
            .collection('movies')
            .find(filter)
            .sort(sort)
            .toArray();

        return NextResponse.json({ movies });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Failed to search movies' },
            { status: 500 }
        );
    }
}