import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/files`);
        if (res.data.success) {
          setFiles(res.data.files);
        }
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {files.map((file, idx) => (
        <div
          key={idx}
          className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center border border-gray-200"
        >
          {/* Thumbnail / Preview */}
          {file.resource_type === "image" ? (
            <img
              src={file.url}
              alt={file.public_id}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600">
              {file.format === "pdf" ? "📄 PDF File" : "📦 File"}
            </div>
          )}

          {/* File Name */}
          <p className="mt-3 text-sm font-medium text-gray-800 truncate w-full text-center">
            {file.public_id.replace("my_notes/", "")}
          </p>

          {/* Open Button */}
          <a
            href={file.format === "pdf" ? file.pdf_url : file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full bg-blue-500 text-white py-2 rounded-xl text-center text-sm font-semibold hover:bg-blue-600 transition"
          >
            {file.resource_type === "image" ? "View Image" : "Open File"}
          </a>
        </div>
      ))}
    </div>
  );
}
