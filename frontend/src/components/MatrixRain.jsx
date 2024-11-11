import React, { useEffect, useRef } from 'react';

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
      context.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Increased opacity for better visibility
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Add slight glow effect
        context.shadowBlur = 5;
        context.shadowColor = '#0F0';
        context.fillText(text, x, y);
        context.shadowBlur = 0;
        
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
        zIndex: 0,
        opacity: 0.8 // Increased opacity for better visibility
      }}
    />
  );
};

function MatrixRainWrapper({ children }) {
  return (
    <div className="relative min-h-screen bg-black font-mono">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Content Container with adjusted opacity */}
      <div className="relative z-10 w-full min-h-screen bg-black bg-opacity-40">
        {children}
      </div>
    </div>
  );
}

export default MatrixRainWrapper;