"use client";  // Add this line to specify this is a Client Component
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';  // Import useRef

const NetworkSafetyPage = () => {
  const router = useRouter();
  const binaryRainRef = useRef(null);  // Create a reference for the binary rain div

  const handleFindAttacks = () => {
    // Navigate to the '/upload' page
    router.push('/upload');
  };

  const handleCheckSafety = () => {
    // Handle Check Safety logic here (this can be updated to a different route if needed)
    router.push('/findAttack');
  };

  useEffect(() => {
    // Create falling binary numbers only after the component has mounted
    if (binaryRainRef.current) {
      createBinaryRain();
    }
  }, []);

  // Function to generate falling binary numbers
  const createBinaryRain = () => {
    const binaryRainDiv = binaryRainRef.current; // Access the div using useRef
    
    const numDrops = 50; // Number of falling binary streams
    const maxDuration = 5; // Max falling time
    
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.className = 'binary-drop';
      drop.style.position = 'absolute';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.fontSize = `${Math.random() * 20 + 20}px`;
      drop.style.color = '#0f0';
      drop.style.animation = `rain ${Math.random() * maxDuration + 3}s linear infinite`;

      const binaryText = document.createElement('span');
      binaryText.textContent = Math.random() > 0.5 ? '1' : '0';
      drop.appendChild(binaryText);
      
      binaryRainDiv.appendChild(drop);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Network Safety</h1>
      <p style={styles.text}>Choose an option below:</p>
      
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleFindAttacks}>
          Find Attacks
        </button>
        <button style={styles.button} onClick={handleCheckSafety}>
          Check Safety of Network
        </button>
      </div>
      
      {/* Falling 0s and 1s */}
      <div ref={binaryRainRef} style={styles.binaryRain}></div> {/* Attach the ref here */}
    </div>
  );
};

// Basic inline styles (updated for "hacking theme" with falling 0s and 1s)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#000', // Dark background for a "hacking" feel
    color: '#0f0', // Neon green text
    fontFamily: "'Courier New', monospace", // Monospace font for that hacker look
    textAlign: 'center',
    overflow: 'hidden', // Hide overflow for falling animation
    position: 'relative', // To position the binary rain
  },
  title: {
    fontSize: '3rem',
    letterSpacing: '5px',
    textTransform: 'uppercase',
    color: '#0f0', // Neon green color for title
    animation: 'glitch 1s infinite alternate', // Glitch effect for title
  },
  text: {
    fontSize: '1.5rem',
    color: '#0f0',
    marginBottom: '30px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    border: '2px solid #0f0',
    borderRadius: '5px',
    backgroundColor: 'transparent', // Transparent background for buttons
    color: '#0f0',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  buttonHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 0 10px #0f0, 0 0 20px #0f0', // Neon glow effect on hover
  },
  binaryRain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: -1,
  }
};

// Glitch animation keyframes (for title)
const glitchStyles = `
  @keyframes glitch {
    0% {
      text-shadow: 2px 0 red, -2px 0 blue;
    }
    50% {
      text-shadow: -2px 0 red, 2px 0 blue;
    }
    100% {
      text-shadow: 2px 0 red, -2px 0 blue;
    }
  }
`;

// Binary rain animation keyframes
const binaryRainStyles = `
  @keyframes rain {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(glitchStyles + binaryRainStyles));
head.appendChild(style);

export default NetworkSafetyPage;
