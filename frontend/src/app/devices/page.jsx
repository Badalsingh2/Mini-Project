'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lightbulb, Thermometer, Lock, Tv, Speaker, RefreshCw } from 'lucide-react'

export default function IoTDeviceDiscoveryPage() {
  const router = useRouter()
  const [devices, setDevices] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [scanStatus, setScanStatus] = useState("Scanning...")

  const discoverDevices = () => {
    setIsRefreshing(true)
    setScanStatus("Scanning...")
    setTimeout(() => {
      const newDevices = [
        { id: 1, name: "Living Room Light", type: "Smart Bulb", icon: Lightbulb, status: "On" },
        { id: 2, name: "Thermostat", type: "Climate Control", icon: Thermometer, status: "72°F" },
        { id: 3, name: "Front Door Lock", type: "Smart Lock", icon: Lock, status: "Locked" },
        { id: 4, name: "Living Room TV", type: "Smart TV", icon: Tv, status: "Off" },
        { id: 5, name: "Kitchen Speaker", type: "Smart Speaker", icon: Speaker, status: "Muted" },
      ]
      setDevices(newDevices)
      setIsRefreshing(false)
      setScanStatus("Scan Complete")
    }, 1000)
  }

  useEffect(() => {
    discoverDevices()
  }, [])

  return (
    <div className="min-h-screen bg-black p-6 font-mono text-green-500">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-500 tracking-wider uppercase animate-pulse">
            Network Devices
          </h1>
          <div className="flex items-center mt-2">
            <span className={`h-2 w-2 rounded-full ${isRefreshing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'} mr-2`}/>
            <span className="text-sm text-green-400 opacity-75">// {scanStatus}</span>
          </div>
        </div>
        
        <button
          onClick={discoverDevices}
          disabled={isRefreshing}
          className="px-6 py-3 text-lg bg-black border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="ml-2">[RESCAN]</span>
        </button>
      </div>

      {/* Grid Section */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer"
        onClick={() => router.push('/attacks')}
      >
        {devices.map((device) => (
          <div 
            key={device.id} 
            className="group relative bg-black border border-green-500/50 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
          >
            {/* Glitch Effect Overlay */}
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Device Icon */}
            <device.icon className="text-green-500 w-12 h-12 mb-4 group-hover:animate-pulse" />
            
            {/* Device Info */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                {device.name}
                <span className="text-xs ml-2 text-green-600">#{device.id.toString(16).padStart(4, '0')}</span>
              </h2>
              
              <p className="text-green-600 font-mono text-sm">
                {'<'}{device.type}{'>'}
              </p>
              
              <div className="flex items-center space-x-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>
                <span className="text-green-400">Status: {device.status}</span>
              </div>
            </div>

            {/* Decorative Binary */}
            <div className="absolute bottom-2 right-2 text-green-800/30 text-xs">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i}>
                  {Math.random().toString(2).slice(2, 10)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Matrix-style decorative elements */}
      <div className="fixed bottom-4 left-4 text-green-800/30 text-xs font-mono">
        {new Date().toISOString()}
      </div>
      <div className="fixed top-4 right-4 text-green-800/30 text-xs font-mono">
        SYSTEM::SECURE_SCAN_v2.1.0
      </div>
    </div>
  )
}