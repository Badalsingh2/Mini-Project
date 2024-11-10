'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter
import Button from '../../components/Button'
import { Lightbulb, Thermometer, Lock, Tv, Speaker, RefreshCw } from 'lucide-react'

export default function IoTDeviceDiscoveryPage() {
  const router = useRouter()
  const [devices, setDevices] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const discoverDevices = () => {
    setIsRefreshing(true)
    // Simulating API call to discover devices
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
    }, 1000)
  }

  useEffect(() => {
    discoverDevices()
  }, [])

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1877f2]">Discovered IoT Devices</h1>
        <Button
          onClick={discoverDevices}
          className="bg-[#1877f2] text-white hover:bg-[#166fe5] flex items-center"
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        onClick={() => router.push('/attacks')} // Add onClick event here
      >
        {devices.map((device) => (
          <div key={device.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <device.icon className="text-[#1877f2] w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold">{device.name}</h2>
            <p className="text-gray-600 mt-2">{device.type}</p>
            <p className="text-sm text-gray-500 mt-1">Status: {device.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
