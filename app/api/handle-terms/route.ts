import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const terms = await sql`SELECT * FROM terms;`;
  return NextResponse.json({ terms }, { status: 200 });
}

/* Unfinished and Untested */
export async function POST(request: Request) {
    const { term_id, term_name } = await request.json();
 
    // To insert
    try {
        if (!term_id || !term_name) throw new Error('Term id and name required');
        await sql`INSERT INTO terms (term_name) VALUES (${term_name});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}