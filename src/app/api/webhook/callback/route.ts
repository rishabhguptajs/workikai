import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { repository, events, callbackUrl } = await request.json();
  const token = request.cookies.get('token')?.value;

  try {
    const webhookResponse = await axios.post(
      `https://api.github.com/repos/${repository}/hooks`,
      {
        config: {
          url: callbackUrl,
          content_type: 'json',
        },
        events: events || ['pull_request'],
      },
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    return NextResponse.json(webhookResponse.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create webhook' }, { status: 500 });
  }
}
