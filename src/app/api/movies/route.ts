// app/api/movies/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Movie from '../../../models/movie.model';

export async function GET() {
  try {
    await dbConnect();
    const movies = await Movie.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}