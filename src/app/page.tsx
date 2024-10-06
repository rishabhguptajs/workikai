"use client"

import Image from "next/image"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a
        href={
          "https://github.com/login/oauth/authorize?client_id=" +
          process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
        }
        className="flex items-center gap-4"
      >
        <button className="px-4 py-2 text-white bg-black rounded-md">
          Authorize with GitHub
        </button>
      </a>
    </div>
  )
}
