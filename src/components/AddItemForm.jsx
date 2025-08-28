import React, { useState } from 'react';
import { databases, storage } from '../services/appwrite';
import { ID } from 'appwrite';

// You'll need to replace these with your actual Appwrite Database and Bucket IDs from your .env file
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID_ITEMS = import.meta.env.VITE_APPWRITE_ITEMS_COLLECTION_ID;
const BUCKET_ID_IMAGES = import.meta.env.VITE_APPWRITE_BUCKET;

const AddItemForm = ({ onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('lost');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location || !image) {
      setError('Please fill in all fields and select an image.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Upload image to Appwrite Storage
      const fileResponse = await storage.createFile(
        BUCKET_ID_IMAGES,
        ID.unique(),
        image
      );
      const imageId = fileResponse.$id;

      // 2. Create a document in the Appwrite database
      const documentResponse = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_ITEMS,
        ID.unique(),
        {
          title,
          location,
          status,
          imageId,
          time: new Date().toISOString(),
        }
      );

      // 3. Update the UI optimistically
      const imageUrl = storage.getFilePreview(BUCKET_ID_IMAGES, imageId);
      
      const newItem = {
        ...documentResponse,
        image: imageUrl.href,
      };

      onAddItem(newItem);
      
      // 4. Reset form and close modal
      setIsOpen(false);
      setTitle('');
      setLocation('');
      setStatus('lost');
      setImage(null);
      e.target.reset();

    } catch (err) {
      console.error('Error creating item:', err);
      setError('Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <span className="mr-2">Report an Item</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Report a Lost or Found Item</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location Found/Lost</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
                <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                <button type="button" onClick={() => setIsOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItemForm;

