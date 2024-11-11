'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Wifi, WifiOff, Shield, ShieldAlert } from 'lucide-react'

export default function WiFiSelectionPage() {
  const router = useRouter()
  const [networks, setNetworks] = useState([])
  const [connectedNetwork, setConnectedNetwork] = useState(null)
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    setScanning(true)
    // Generate random networks with security status
    const randomNetworks = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `NET_${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
      strength: Math.floor(Math.random() * 4) + 1,
      secured: Math.random() > 0.3,
    }))
    setTimeout(() => {
      setNetworks(randomNetworks)
      setScanning(false)
    }, 1500)
  }, [])

  const handleConnect = (network) => {
    setConnectedNetwork(network)
    setTimeout(() => {
      router.push('/devices')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black p-6 font-mono text-green-500">
      {/* Header with scanning status */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-wider uppercase mb-2">
          Network Scanner
        </h1>
        <div className="flex items-center">
          <span className={`h-2 w-2 rounded-full ${scanning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'} mr-2`}/>
          <span className="text-sm opacity-75">
            {scanning ? 'SCANNING_NETWORKS...' : 'SCAN_COMPLETE'}
          </span>
        </div>
      </div>

      {/* Network List */}
      <div className="space-y-4">
        {networks.map((network) => (
          <div 
            key={network.id} 
            className="border border-green-500/50 bg-black p-4 hover:border-green-400 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              {/* Network Info */}
              <div className="flex items-center space-x-4">
                {network.strength > 0 ? (
                  <Wifi className="text-green-500 w-5 h-5 group-hover:animate-pulse" />
                ) : (
                  <WifiOff className="text-red-500 w-5 h-5" />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium tracking-wider">{network.name}</span>
                    {network.secured ? (
                      <Shield className="w-4 h-4 text-green-600" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    {`ID: ${network.id.toString(16).padStart(4, '0')}`}
                  </div>
                </div>
              </div>

              {/* Signal Strength and Connect Button */}
              <div className="flex items-center space-x-6">
                <div className="flex space-x-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-4 ${
                        i < network.strength 
                          ? 'bg-green-500' 
                          : 'bg-green-900'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleConnect(network)}
                  disabled={connectedNetwork !== null}
                  className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/20"
                >
                  [CONNECT]
                </button>
              </div>
            </div>

            {/* Decorative Binary */}
            <div className="text-green-900 text-xs mt-2 font-mono">
              {Math.random().toString(2).slice(2, 42)}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Overlay */}
      {connectedNetwork && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center backdrop-blur-sm">
          <div className="border border-green-500 p-8 text-center bg-black">
            <div className="animate-pulse mb-4">
              <Wifi className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-xl font-bold text-green-400 tracking-wider mb-2">
                ESTABLISHING_CONNECTION
              </p>
              <p className="text-green-600 font-mono">
                {connectedNetwork.name}
              </p>
            </div>
            <div className="text-green-700 text-sm animate-pulse">
              REDIRECTING_TO_DEVICE_SCANNER...
            </div>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="fixed bottom-4 left-4 text-green-800/30 text-xs">
        {new Date().toISOString()}
      </div>
      <div className="fixed top-4 right-4 text-green-800/30 text-xs">
        NETWORK::SCAN_v1.0.2
      </div>
    </div>
  )
}