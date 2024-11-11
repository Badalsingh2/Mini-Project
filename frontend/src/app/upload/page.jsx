'use client';
import MatrixRainWrapper from "@/components/MatrixRain";
import React, { useState, useRef, useEffect } from "react";

const LoadExcel = () => {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const htmlRef = useRef(null);

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
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Failed to upload file.");
        return;
      }

      const html = await response.text();
      setHtmlContent(html);

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (htmlRef.current) {
      const table = htmlRef.current.querySelector("table");
      if (table) {
        // Add matrix theme classes to the table
        table.classList.add(
          "w-full",
          "border-collapse",
          "text-green-400",
          "border-green-400"
        );

        const ths = table.querySelectorAll("th");
        ths.forEach((th) => {
          th.classList.add(
            "border",
            "border-green-400",
            "px-4",
            "py-2",
            "bg-black",
            "bg-opacity-50",
            "text-left",
            "text-green-400"
          );
        });

        const tds = table.querySelectorAll("td");
        tds.forEach((td) => {
          td.classList.add(
            "border",
            "border-green-400",
            "px-4",
            "py-2",
            "text-green-400"
          );
        });
      }
    }
  }, [htmlContent]);

  return (
    <MatrixRainWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center text-green-400 animate-pulse">
            Upload Excel File
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
            <div className="relative group w-full max-w-md">
              <input
                type="file"
                name="excel_file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-black bg-opacity-50 
                         border-2 border-green-400 rounded-lg text-green-400
                         file:mr-4 file:py-2 file:px-4 file:rounded-md
                         file:border-0 file:bg-green-400 file:text-black
                         hover:file:bg-green-500 file:cursor-pointer
                         focus:outline-none focus:border-green-500
                         transition-all duration-300"
              />
            </div>
            
            <button 
              type="submit" 
              className="px-8 py-3 bg-black bg-opacity-50 
                       border-2 border-green-400 rounded-lg
                       text-green-400 font-semibold
                       hover:bg-green-400 hover:text-black
                       transition-all duration-300
                       focus:outline-none focus:ring-2 
                       focus:ring-green-400 focus:ring-opacity-50
                       disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!file}
            >
              Upload
            </button>
          </form>

          {htmlContent && (
            <div
              ref={htmlRef}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="mt-8 p-6 bg-black bg-opacity-50 
                         border-2 border-green-400 rounded-lg 
                         shadow-lg shadow-green-400/20
                         overflow-x-auto"
            />
          )}
        </div>
      </div>
    </MatrixRainWrapper>
  );
};

export default LoadExcel;