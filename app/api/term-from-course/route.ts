import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
      const { searchParams } = new URL(request.url);
      const term_id = searchParams.get('term_id');

      if (!term_id) {
        return NextResponse.json(
          { error: 'term_id query parameter is required' },
          { status: 400 }
        );
      }
   
      try {
        // Query the database
        const data = await sql`SELECT term_name FROM terms WHERE term_id=${term_id}`;
    
        // Log query result for debugging
        console.log('Query result:', data.rows || data);
    
        // Return the rows from the query
        console.log(NextResponse.json({ data: data.rows }, { status: 200 }));
        return NextResponse.json({ data: data.rows }, { status: 200 });
      } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch data from the database' },
          { status: 500 }
        );
      }
}