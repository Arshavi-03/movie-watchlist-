// app/api/watchlist/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/user.model';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        
        const user = await User.findOne({ email: session.user.email })
            .select('watchlist')
            .lean();

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ watchlist: user.watchlist });
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        return NextResponse.json(
            { error: 'Failed to fetch watchlist' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { movieId } = await request.json();

        if (!movieId) {
            return NextResponse.json(
                { error: 'Movie ID is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if movie already exists in watchlist
        const existingMovie = user.watchlist.find(
            (item: any) => item.movieId === movieId
        );

        if (existingMovie) {
            return NextResponse.json(
                { error: 'Movie already in watchlist' },
                { status: 400 }
            );
        }

        // Add movie to watchlist
        user.watchlist.push({
            movieId,
            addedAt: new Date(),
            status: 'plan_to_watch'
        });

        await user.save();

        return NextResponse.json({ 
            message: 'Movie added to watchlist',
            watchlist: user.watchlist 
        });
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        return NextResponse.json(
            { error: 'Failed to add to watchlist' },
            { status: 500 }
        );
    }
}