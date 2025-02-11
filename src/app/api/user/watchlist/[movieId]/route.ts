// app/api/user/watchlist/[movieId]/route.ts
export async function DELETE(
    request: Request,
    { params }: { params: { movieId: string } }
) {
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

        // Remove movie from watchlist
        user.watchlist = user.watchlist.filter(
            (item: any) => item.movieId !== params.movieId
        );

        await user.save();

        return NextResponse.json({ message: 'Movie removed from watchlist' });
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}