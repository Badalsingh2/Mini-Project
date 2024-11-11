"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BellIcon, Calendar, File, Share } from "lucide-react";

// Matrix rain effect component
const MatrixRain = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/20 to-black" />
    </div>
  );
};

const features = [
  {
    Icon: File,
    name: "Secure Storage",
    description: "Military-grade encryption for your data security.",
    href: "#",
    cta: "Access Files",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: BellIcon,
    name: "Real-time Alerts",
    description: "Instant notifications for security breaches and system anomalies.",
    href: "#",
    cta: "Configure Alerts",
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Share,
    name: "Secure Network",
    description: "Advanced encryption protocols protecting your IoT ecosystem.",
    href: "#",
    cta: "View Network",
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Calendar,
    name: "Activity Log",
    description: "Comprehensive timeline of all system activities and events.",
    href: "#",
    cta: "View Timeline",
    className: "col-span-3 lg:col-span-1",
  },
];

function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      <MatrixRain />
      
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-green-500/30">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold hover:text-green-300 transition-colors duration-300 cursor-pointer">
            IotSecure<span className="text-green-500 animate-pulse">_</span>
          </h1>
          <div className="space-x-4">
            <button onClick={() => router.push('/login')} 
                    className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 
                             hover:border-green-400 transition-all duration-300 rounded">
              Login
            </button>
            <button onClick={() => router.push('/signup')} 
                    className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 
                             hover:border-green-400 transition-all duration-300 rounded">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <section className={`relative flex flex-col items-center justify-center text-center py-32 
                          transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none" />
        <h2 className="text-6xl font-bold mb-6 text-green-400 tracking-tight">
          Welcome to the Matrix
        </h2>
        <p className="text-xl max-w-2xl mb-8 text-green-300/90 leading-relaxed">
          Step into a world where your IoT devices are protected by advanced encryption protocols.
          The future of security is here.
        </p>
        <button onClick={() => router.push('/wifi')} 
                className="group relative px-8 py-3 bg-green-500/20 hover:bg-green-500/30 
                          border border-green-500/50 hover:border-green-400 
                          transition-all duration-300 rounded-md overflow-hidden">
          <span className="relative z-10 text-xl">Initialize Connection</span>
          <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 
                        bg-gradient-to-b from-green-400/20 to-transparent transition-transform duration-500" />
        </button>
      </section>

      <section className="py-20 bg-black/90 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/5 to-transparent" />
        <h2 className="text-4xl font-bold text-center mb-16">System Protocols</h2>
        <div className="grid grid-cols-3 gap-8 px-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} 
                 className={`group relative bg-black/60 p-8 rounded-lg border border-green-500/30 
                            hover:border-green-400/50 transition-all duration-300 ${feature.className}
                            backdrop-blur-sm hover:backdrop-blur-md`}>
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <feature.Icon className="h-8 w-8 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-3">{feature.name}</h3>
              <p className="text-lg mb-4 text-green-300/80">{feature.description}</p>
              <button onClick={() => router.push(feature.href)} 
                      className="text-green-400 hover:text-green-300 transition-colors duration-300">
                {feature.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-black/90 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/5 to-transparent" />
        <h2 className="text-4xl font-bold text-center mb-16">User Logs</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 px-8 max-w-7xl mx-auto">
          {[
            {
              text: "Enhanced security protocols have transformed our IoT infrastructure. Highly recommended for any system admin.",
              author: "Agent Smith"
            },
            {
              text: "The encryption algorithms provided by IotSecure have proven impenetrable. A essential tool for the digital age.",
              author: "Trinity"
            },
            {
              text: "Revolutionary protection for our connected devices. The future of IoT security is here.",
              author: "Neo"
            }
          ].map((testimonial, index) => (
            <div key={index} 
                 className="group bg-black/60 p-8 rounded-lg border border-green-500/30 
                           hover:border-green-400/50 transition-all duration-300 backdrop-blur-sm 
                           hover:backdrop-blur-md relative">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-lg text-green-300/80 relative z-10">{testimonial.text}</p>
              <p className="mt-4 text-right text-green-400 group-hover:text-green-300 
                          transition-colors duration-300 relative z-10">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;