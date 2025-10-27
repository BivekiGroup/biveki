import { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Require authenticated user
    const cookie = req.headers.get('cookie') || '';
    const m = /(?:^|; )session=([^;]+)/.exec(cookie);
    if (!m) return new Response('Unauthorized', { status: 401 });

    let user: any = null;
    try {
      user = await verifySession(decodeURIComponent(m[1]));
    } catch {}
    if (!user) return new Response('Unauthorized', { status: 401 });

    const body = await req.json();
    const { query, branch_type, type } = body;

    if (!query || typeof query !== 'string') {
      return new Response('Invalid query', { status: 400 });
    }

    const apiKey = process.env.DADATA_API_KEY;
    if (!apiKey) {
      console.error('DADATA_API_KEY not configured');
      return Response.json({ suggestions: [] });
    }

    // Build request body
    const requestBody: any = { query };
    if (branch_type) requestBody.branch_type = branch_type;
    if (type) requestBody.type = type;

    // Call DaData API
    const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('DaData API error:', response.status, await response.text());
      return Response.json({ suggestions: [] });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('DaData party proxy error:', error);
    return Response.json({ suggestions: [] });
  }
}
