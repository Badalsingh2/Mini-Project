'use client';
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import MatrixRainWrapper from "@/components/MatrixRain";

const LoadExcel = () => {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [isAttacked, setIsAttacked] = useState(false);
  const [isSafe, setIsSafe] = useState(false);
  const htmlRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("excel_file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/label/", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        alert("Failed to upload file.");
        return;
      }

      const html = await response.text();
      setHtmlContent(html);

      const parsedContent = JSON.parse(html);
      const countOfOnes = parsedContent[1];
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

  const handleBack = () => {
    router.push("/attacks");
  };

  useEffect(() => {
    if (htmlRef.current) {
      const table = htmlRef.current.querySelector("table");
      if (table) {
        table.classList.add("table-auto", "w-full", "border-collapse");

        const ths = table.querySelectorAll("th");
        ths.forEach((th) => {
          th.classList.add("border", "px-4", "py-2", "bg-gray-900", "text-green-500", "text-left");
        });

        const tds = table.querySelectorAll("td");
        tds.forEach((td) => {
          td.classList.add("border", "px-4", "py-2", "text-green-400");
        });
      }
    }
  }, [htmlContent]);

  return (
    <div className="min-h-screen bg-transparent">
      <MatrixRainWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-opacity-50 backdrop-blur-sm relative z-20">
            <h2 className="text-2xl font-bold uppercase mb-6 text-green-500 text-shadow-lg animate-pulse">
              Upload Excel File
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
              <div className="w-full">
                <input
                  type="file"
                  name="excel_file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="w-full p-3 border-2 border-green-500 bg-black bg-opacity-70 text-green-500 rounded-lg focus:outline-none focus:border-green-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-green-500 file:bg-black file:hover:bg-green-900 transition-all"
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-black border-2 border-green-500 text-green-500 uppercase font-mono text-lg rounded-lg shadow-lg hover:bg-green-500 hover:text-black transition duration-300 hover:shadow-green-500/50"
              >
                Upload
              </button>
            </form>

            {htmlContent && (
              <div 
                ref={htmlRef} 
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
                className="mt-6 p-6 rounded-lg shadow-lg bg-black bg-opacity-70 text-green-500"
              />
            )}

            {isAttacked && (
              <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50">
                <div className="animate-pulse">
                  <p className="text-6xl text-red-500 font-bold mb-4">⚠️</p>
                  <p className="text-5xl text-red-500 font-bold mb-8">ATTACK DETECTED</p>
                </div>
                <button 
                  onClick={handleBack} 
                  className="mt-6 px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 uppercase text-lg rounded-lg shadow-lg hover:bg-green-500 hover:text-black transition duration-300"
                >
                  Go Back
                </button>
              </div>
            )}

            {isSafe && (
              <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50">
                <div className="animate-bounce">
                  <p className="text-6xl text-green-500 font-bold mb-4">✔️</p>
                  <p className="text-5xl text-green-500 font-bold mb-8">Network is Safe</p>
                </div>
                <button 
                  onClick={handleBack} 
                  className="mt-6 px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 uppercase text-lg rounded-lg shadow-lg hover:bg-green-500 hover:text-black transition duration-300"
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </MatrixRainWrapper>
    </div>
  );
};

export default LoadExcel;