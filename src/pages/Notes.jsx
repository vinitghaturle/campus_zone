import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploading, setUploading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch files
  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/files`);
      if (res.data.success) {
        setFiles(res.data.files);
      }
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Upload files
  const handleUpload = async () => {
    if (!selectedFiles) return;

    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("files", file);
    }

    try {
      setUploading(true);
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Files uploaded successfully!");
        setSelectedFiles(null);
        fetchFiles(); // refresh list
      } else {
        alert("❌ Upload failed!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload error. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Section */}
      <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFiles}
          className={`px-4 py-2 rounded-xl font-semibold text-white transition ${
            uploading || !selectedFiles
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
}
