import React, { useEffect, useState } from 'react';
import { storage } from '../services/appwrite';

export default function UploadDemo() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const bucketId = import.meta.env.VITE_APPWRITE_BUCKET;

  const refresh = async () => {
    const res = await storage.listFiles(bucketId);
    setFiles(res.files || []);
  };

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    await storage.createFile(bucketId, 'unique()', file);
    setFile(null);
    await refresh();
  };

  useEffect(() => { refresh(); }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upload Demo</h1>

      <form onSubmit={onUpload} className="flex items-center space-x-3 mb-6">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])}
               className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:bg-white file:hover:bg-gray-50" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Upload</button>
      </form>

      <ul className="space-y-3">
        {files.map(f => (
          <li key={f.$id} className="p-3 border rounded flex justify-between items-center">
            <span className="text-sm">{f.name}</span>
            <a
              className="text-blue-600 text-sm"
              href={storage.getFilePreview(bucketId, f.$id).href}
              target="_blank" rel="noreferrer"
            >
              Preview
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}