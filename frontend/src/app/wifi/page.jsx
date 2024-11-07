'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../components/Button'
import { Wifi, WifiOff } from 'lucide-react'

export default function WiFiSelectionPage() {
  const router = useRouter()
  const [networks, setNetworks] = useState([])
  const [connectedNetwork, setConnectedNetwork] = useState(null)

  useEffect(() => {
    // Generate random networks
    const randomNetworks = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `WiFi Network ${i + 1}`,
      strength: Math.floor(Math.random() * 4) + 1, // 1 to 4 bars
    }))
    setNetworks(randomNetworks)
  }, [])

  const handleConnect = (network) => {
    setConnectedNetwork(network)
    setTimeout(() => {
      router.push('/devices')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-6">
      <h1 className="text-3xl font-bold text-[#1877f2] mb-6">Select a Wi-Fi Network</h1>
      <div className="space-y-4">
        {networks.map((network) => (
          <div key={network.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center">
              {network.strength > 0 ? (
                <Wifi className="text-[#1877f2] mr-2" />
              ) : (
                <WifiOff className="text-gray-400 mr-2" />
              )}
              <span className="font-medium">{network.name}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-4 flex">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 mx-px rounded-sm ${
                      i < network.strength ? 'bg-[#1877f2]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={() => handleConnect(network)}
                className="bg-[#1877f2] text-white hover:bg-[#166fe5]"
                disabled={connectedNetwork !== null}
              >
                Connect
              </Button>
            </div>
          </div>
        ))}
      </div>
      {connectedNetwork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-xl font-bold mb-2">Connected to {connectedNetwork.name}</p>
            <p>Redirecting to devices...</p>
          </div>
        </div>
      )}
    </div>
  )
}