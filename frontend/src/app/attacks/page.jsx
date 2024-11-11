"use client"
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MatrixRainWrapper from '@/components/MatrixRain';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        context.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

const NetworkSafetyPage = () => {
  const router = useRouter();

  const handleFindAttacks = () => {
    router.push('/upload');
  };

  const handleCheckSafety = () => {
    router.push('/findAttack');
  };

  return (
      <MatrixRainWrapper>
        
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl font-bold mb-8 tracking-wider uppercase text-green-500 animate-pulse">
          Network Safety
        </h1>
        
        <p className="text-xl mb-12 text-green-400">
          Choose an option below:
        </p>
        
        <div className="space-y-4 w-full max-w-md">
          <button
            onClick={handleCheckSafety}
            className="w-full px-6 py-3 text-lg text-green-500 border-2 border-green-500 
                     bg-black bg-opacity-75
                     hover:bg-green-500 hover:bg-opacity-20 
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     focus:ring-opacity-50 rounded"
          >
            Check Safety of Network
          </button>
          
          <button
            onClick={handleFindAttacks}
            className="w-full px-6 py-3 text-lg text-green-500 border-2 border-green-500 
                     bg-black bg-opacity-75
                     hover:bg-green-500 hover:bg-opacity-20 
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     focus:ring-opacity-50 rounded"
          >
            Find Attacks
          </button>
        </div>
      </div>
      
      </MatrixRainWrapper>
  );
};

export default NetworkSafetyPage;