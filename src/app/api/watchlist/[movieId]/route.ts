// app/api/watchlist/[movieId]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/user.model';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export async function DELETE(
    request: Request,
    { params }: { params: { movieId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
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

        // Remove movie from watchlist
        user.watchlist = user.watchlist.filter(
            (item: any) => item.movieId !== params.movieId
        );

        await user.save();

        return NextResponse.json({ 
            message: 'Movie removed from watchlist',
            watchlist: user.watchlist 
        });
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return NextResponse.json(
            { error: 'Failed to remove from watchlist' },
            { status: 500 }
        );
    }
}