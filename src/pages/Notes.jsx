import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Image as ImageIcon, FileArchive, Loader2, Upload } from "lucide-react";

const Notes = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch files from backend
  const fetchFiles = async () => {
    setLoading(true);
    try {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/files`);
      setFiles(res.data.files || []);
    } catch (err) {
      console.error("Error fetching files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file upload
  const handleUpload = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles.length) return;

    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("files", file);
    }

    setUploading(true);
    try {
  await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles(); // Refresh list after upload
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // Pick icon by file type
  const getFileIcon = (file) => {
    if (file.resource_type === "image")
      return <ImageIcon className="w-10 h-10 text-blue-500" />;
    if (file.format === "pdf" || file.format === "doc" || file.format === "docx")
      return <FileText className="w-10 h-10 text-red-500" />;
    if (file.format === "zip")
      return <FileArchive className="w-10 h-10 text-yellow-500" />;
    return <FileText className="w-10 h-10 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📂 My Notes</h1>

      {/* Upload Section */}
      <div className="flex justify-center mb-6">
        <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl shadow cursor-pointer hover:bg-blue-600 transition">
          <Upload className="mr-2 w-5 h-5" />
          {uploading ? "Uploading..." : "Upload Files"}
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* File Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file.public_id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-between hover:shadow-lg transition"
            >
              {/* Show image preview OR icon */}
              {file.resource_type === "image" ? (
                <img
                  src={file.url}
                  alt={file.public_id}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-40 bg-gray-100 rounded-lg mb-3">
                  {getFileIcon(file)}
                </div>
              )}

              {/* File info */}
              <p className="text-sm font-medium text-center truncate w-full">
                {file.public_id.split("/").pop()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(file.created_at).toLocaleDateString()}
              </p>

              {/* Download / View Button */}
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-xl text-center text-sm font-semibold hover:bg-blue-600 transition"
              >
                {file.resource_type === "image" ? "View" : "Open"}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
