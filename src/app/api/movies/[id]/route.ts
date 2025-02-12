import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Movie from '../../../../models/Movie';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        
        // Validate the ID parameter
        const movieId = params?.id;
        if (!movieId) {
            return NextResponse.json(
                { error: 'Movie ID is required' },
                { status: 400 }
            );
        }

        const movie = await Movie.findById(movieId).lean();

        if (!movie) {
            return NextResponse.json(
                { error: 'Movie not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ movie });
    } catch (error) {
        console.error('Error fetching movie:', error);
        return NextResponse.json(
            { error: 'Failed to fetch movie details' },
            { status: 500 }
        );
    }
}