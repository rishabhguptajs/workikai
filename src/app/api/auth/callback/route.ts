import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  try {
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    const { access_token } = tokenResponse.data;

    const baseUrl = request.nextUrl.origin;

    const response = NextResponse.redirect(`${baseUrl}/`);
    
    response.cookies.set('token', access_token, { path: '/' });

    return response;
  } catch (error: any) {
    console.error('OAuth failed:', error.response?.data || error.message);
    return NextResponse.json({ error: 'OAuth failed: ' + error.message }, { status: 500 });
  }
}
