'use client';
import React, { useState, useRef, useEffect } from "react";

// Add styles using inline styles or external CSS
const LoadExcel = () => {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState(""); // State to store HTML content
  const htmlRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
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
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Failed to upload file.");
        return;
      }

      // Get HTML content from the response
      const html = await response.text();
      setHtmlContent(html); // Store the HTML content in the state

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (htmlRef.current) {
      // Example: Apply Tailwind classes to the table and cells
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
    <div className="h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-6 animate-pulse">Upload Excel File</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="file"
          name="excel_file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="bg-black border-2 border-green-400 px-4 py-2 text-green-400 rounded-md shadow-lg hover:bg-green-700 transition duration-200 ease-in-out"
        />
        <button 
          type="submit" 
          className="bg-black border-2 border-green-400 px-6 py-3 text-green-400 rounded-md hover:bg-green-700 transition duration-200 ease-in-out glitch"
        >
          Upload
        </button>
      </form>

      {/* Render the HTML content received from the backend */}
      {htmlContent && (
        <div
          ref={htmlRef}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="mt-6 bg-black p-6 border-2 border-green-400 rounded-md shadow-xl"
        />
      )}
    </div>
  );
};

export default LoadExcel;
