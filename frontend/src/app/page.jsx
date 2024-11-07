'use client'

import { useRouter } from 'next/navigation'
import Button from '../components/Button'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-[#1877f2] mb-4">IotSecure</h1>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-md">
        Connect your smart home devices and control them with ease.
      </p>
      <Button 
        onClick={() => router.push('/wifi')}
        className="bg-[#1877f2] text-white text-xl px-8 py-3 hover:bg-[#166fe5] transition-colors"
      >
        Connect to Network
      </Button>
    </div>
  )
}