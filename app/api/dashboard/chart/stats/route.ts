import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/actions/getdashboardstat';

export async function GET() {
  try {
    const data = await getDashboardStats();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}