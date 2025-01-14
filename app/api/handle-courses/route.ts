import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    const courses = await sql`SELECT * FROM courses;`;

    return NextResponse.json({ courses }, { status: 200 });
}