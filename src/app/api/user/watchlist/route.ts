// app/api/user/watchlist/route.ts
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const user = await User.findOne({ email: session.user.email });
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
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { movieId, status } = await request.json();

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
            // Update existing entry
            existingMovie.status = status;
        } else {
            // Add new entry
            user.watchlist.push({
                movieId,
                status,
                addedAt: new Date(),
            });
        }

        await user.save();

        return NextResponse.json({ message: 'Watchlist updated successfully' });
    } catch (error) {
        console.error('Error updating watchlist:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

