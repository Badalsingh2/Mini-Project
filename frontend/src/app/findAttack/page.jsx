'use client'; // Mark this as a client-side component
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';

const LoadExcel = () => {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState(""); // State to store HTML content
  const [isAttacked, setIsAttacked] = useState(false); // Track if attack is detected
  const [isSafe, setIsSafe] = useState(false); // Track if the network is safe
  const htmlRef = useRef(null);
  const router = useRouter();

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission to upload the file
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append("excel_file", file);

    try {
      // Send the request to the backend
      const response = await fetch("http://127.0.0.1:8000/label/", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        alert("Failed to upload file.");
        return;
      }

      // Get HTML content from the backend response
      const html = await response.text();
      setHtmlContent(html); // Store the HTML content in the state

      // Check if attack is detected (if count of 1's is greater than 0)
      const parsedContent = JSON.parse(html); // Assuming the backend sends JSON response
      const countOfOnes = parsedContent[1]; // Assume the count of 1's is sent in the response
      if (countOfOnes > 0) {
        setIsAttacked(true);
        setIsSafe(false);
      } else {
        setIsSafe(true);
        setIsAttacked(false);
      }

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Go back to previous page
  const handleBack = () => {
    router.push("/attacks"); // You can change this route as needed
  };

  // Apply styling to the received HTML content (e.g., table styling)
  useEffect(() => {
    if (htmlRef.current) {
      const table = htmlRef.current.querySelector("table");
      if (table) {
        table.classList.add("table-auto", "w-full", "border-collapse");

        const ths = table.querySelectorAll("th");
        ths.forEach((th) => {
          th.classList.add("border", "px-4", "py-2", "bg-gray-100", "text-left");
        });

        const tds = table.querySelectorAll("td");
        tds.forEach((td) => {
          td.classList.add("border", "px-4", "py-2");
        });
      }
    }
  }, [htmlContent]);

  return (
    <div className="max-w-2xl mx-auto p-4" style={styles.container}>
      <h2 className="text-xl font-bold text-center mb-4" style={styles.header}>Upload Excel File</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4" style={styles.form}>
        <input
          type="file"
          name="excel_file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border p-2"
          style={styles.input}
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          style={styles.button}
        >
          Upload
        </button>
      </form>

      {/* Render the HTML content received from the backend */}
      {htmlContent && (
        <div 
          ref={htmlRef} 
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
          className="mt-6" 
          style={styles.contentContainer}
        />
      )}

      {/* If an attack is detected, show the "Danger Hacking" animation */}
      {isAttacked && (
        <div style={styles.attackOverlay}>
          <p style={styles.attackText}>⚠️ ATTACK DETECTED ⚠️</p>
          <div className="matrix-animation"></div>
          <button onClick={handleBack} style={styles.backButton}>Go Back</button>
        </div>
      )}

      {/* If the network is safe, show "Safe" status */}
      {isSafe && (
        <div style={styles.safeOverlay}>
          <p style={styles.safeText}>✔️ Network is Safe</p>
          <button onClick={handleBack} style={styles.backButton}>Go Back</button>
        </div>
      )}
    </div>
  );
};

// Styling with "hacking" theme
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#000',  // Dark background for hacker vibe
    color: '#0f0',  // Neon green text color
    fontFamily: "'Courier New', monospace",  // Monospace font for hacker look
    textAlign: 'center',
    overflow: 'hidden',  // Prevent overflow of falling binary rain
    position: 'relative',
  },
  header: {
    fontSize: '2rem',
    textTransform: 'uppercase',
    textShadow: '2px 0px 10px rgba(0,255,0,0.7)',  // Green glow text shadow
  },
  form: {
    backgroundColor: 'transparent',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,255,0,0.5)',
  },
  input: {
    borderColor: '#0f0',  // Neon green border
    backgroundColor: 'transparent',  // Transparent background
    color: '#0f0',  // Neon green text color
    fontFamily: "'Courier New', monospace",
  },
  button: {
    borderColor: '#0f0',
    backgroundColor: 'transparent',  // Transparent background for button
    color: '#0f0',
    fontFamily: "'Courier New', monospace",
    fontSize: '16px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    boxShadow: '0 0 10px #0f0',  // Neon green glow effect
  },
  contentContainer: {
    marginTop: '30px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,255,0,0.5)',
    backgroundColor: 'rgba(0,0,0,0.8)',  // Dark background for content area
  },
  attackOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    textAlign: 'center',
    fontSize: '2rem',
    color: '#ff0000', // Red for danger
    fontWeight: 'bold',
    textShadow: '0 0 10px rgba(255,0,0,0.7)',
    backdropFilter: 'blur(10px)',  // Blur the background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 30px rgba(255,0,0,0.5)',
  },
  safeOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    textAlign: 'center',
    fontSize: '2rem',
    color: '#00ff00', // Green for safety
    fontWeight: 'bold',
    textShadow: '0 0 10px rgba(0,255,0,0.7)',
    backdropFilter: 'blur(10px)',  // Blur the background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 30px rgba(0,255,0,0.5)',
  },
  attackText: {
    fontSize: '3rem',
    color: '#ff0000', // Red for danger
    fontWeight: 'bold',
    textShadow: '0 0 20px rgba(255,0,0,0.7)',
  },
  safeText: {
    fontSize: '3rem',
    color: '#00ff00', // Green for safety
    fontWeight: 'bold',
    textShadow: '0 0 20px rgba(0,255,0,0.7)',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '2px solid #0f0',
    color: '#0f0',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '5px',
    boxShadow: '0 0 10px #0f0',  // Neon green glow effect
    transition: 'background-color 0.3s ease',
  },
};

export default LoadExcel;
