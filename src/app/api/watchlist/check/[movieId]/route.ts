// app/api/watchlist/check/[movieId]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../../lib/mongodb';
import User from '../../../../../models/user.model';
import { authOptions } from '../../../../api/auth/[...nextauth]/route';

export async function GET(
    request: Request,
    { params }: { params: { movieId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { isInWatchlist: false },
                { status: 200 }
            );
        }

        await dbConnect();
        
        const user = await User.findOne({ email: session.user.email });
        
        if (!user) {
            return NextResponse.json(
                { isInWatchlist: false },
                { status: 200 }
            );
        }

        const movieInWatchlist = user.watchlist.find(
            (item: any) => item.movieId === params.movieId
        );

        return NextResponse.json({ 
            isInWatchlist: !!movieInWatchlist,
            status: movieInWatchlist?.status || null
        });
    } catch (error) {
        console.error('Error checking watchlist:', error);
        return NextResponse.json(
            { error: 'Failed to check watchlist status' },
            { status: 500 }
        );
    }
}