import { NextResponse } from 'next/server';
import { getAllMovies } from '@/lib/actions/getallmovies';

export async function GET() {
  try {
    const data = await getAllMovies();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching all movies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}