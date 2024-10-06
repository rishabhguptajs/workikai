"use client"

import React, { useEffect, useState, Suspense } from "react"
import axios from "axios"
import { useSearchParams } from "next/navigation"

const AuthDonePage = () => {
  const [authStatus, setAuthStatus] = useState<string>("Authenticating...")
  const searchParams = useSearchParams()

  const sendAuthCode = async (code: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github/callback?code=${code}`
      )
      console.log(response)
      setAuthStatus("Authentication successful!")
    } catch (error) {
      console.error(error)
      setAuthStatus("Authentication failed. Please try again.")
    }
  }

  useEffect(() => {
    const code = searchParams.get("code")
    if (code) {
      sendAuthCode(code)
    } else {
      setAuthStatus("No authentication code found.")
    }
  }, [searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          GitHub Authentication
        </h1>
        <p
          className={`text-lg ${
            authStatus.includes("successful")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {authStatus}
        </p>
        {authStatus.includes("successful") && (
          <div className="mt-6 text-sm text-gray-500">
            Now you can close this window and continue with GitHub. The PR
            review comment will be posted automatically upon opening the PR.
          </div>
        )}
      </div>
    </div>
  )
}

const AuthDonePageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthDonePage />
  </Suspense>
)

export default AuthDonePageWrapper
