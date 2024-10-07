import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, pull_request } = body;

  if (action === 'opened') {
    const prData = pull_request;

    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' });
    }

    const review = await reviewPrWithAI(prData);

    await postReviewComment(prData, review, token);
  }

  return NextResponse.json({ message: 'Webhook received' });
}

async function reviewPrWithAI(prData: any) {
  const review = 'This is an automatic AI review comment';
  return review;
}

async function postReviewComment(prData: any, review: string, token: string) {
  await axios.post(
    `${prData.issue_url}/comments`,
    { body: review },
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
}
