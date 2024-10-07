"use client"

import { useEffect, useState } from 'react';
import Cookie from 'js-cookie'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = Cookie.get('token');
    setIsConnected(!!token);
  })

  const connectGithub = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&redirect_uri=${redirectUri}`;
    window.location.href = githubOAuthUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl mb-4">GitHub PR Reviewer</h1>
        {isConnected ? (
          <p>Connected to GitHub</p>
        ) : (
          <button onClick={connectGithub} className="bg-blue-500 text-white p-3 rounded">
            Connect GitHub
          </button>
        )}
      </div>
    </div>
  );
}
