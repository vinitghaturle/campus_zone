// import React, { useState } from 'react';
// import { Search, Filter, Plus, MapPin, Clock } from 'lucide-react';
// import { mockLostFoundItems } from '../data/mock';
// import AddItemForm from '../components/AddItemForm';

// const LostFound = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredItems = mockLostFoundItems.filter(item => {
//     if (activeTab === 'lost' && item.status !== 'lost') return false;
//     if (activeTab === 'found' && item.status !== 'found') return false;
//     if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//     return true;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Lost & Found</h1>
//         <p className="text-gray-600">Report or find lost items on campus</p>
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
//           <Plus className="w-4 h-4" />
//           <span><AddItemForm/></span>
//         </button>
        
//         <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
//           <div className="relative w-full sm:w-auto">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search items..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
//             />
//           </div>
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <Filter className="w-4 h-4" />
//             <span>Filter</span>
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
//         {[
//           { key: 'all', label: 'All Items' },
//           { key: 'lost', label: 'Lost Items' },
//           { key: 'found', label: 'Found Items' },
//           { key: 'my', label: 'My Reports' }
//         ].map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === tab.key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Items Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {filteredItems.map((item) => (
//           <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
//             <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
//             <div className="p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-semibold text-gray-900">{item.title}</h3>
//                 <span className={`px-2 py-1 text-xs rounded-full ${
//                   item.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
//                 }`}>
//                   {item.status}
//                 </span>
//               </div>
//               <div className="flex items-center text-sm text-gray-600 mb-1">
//                 <MapPin className="w-4 h-4 mr-1" />
//                 <span>{item.location}</span>
//               </div>
//               <div className="flex items-center text-sm text-gray-600 mb-4">
//                 <Clock className="w-4 h-4 mr-1" />
//                 <span>{item.time}</span>
//               </div>
//               <button className="w-full bg-white border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center">
//         <p className="text-sm text-gray-600">Showing 1-6 of 24 items</p>
//         <div className="flex space-x-2">
//           <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
//           {[1, 2, 3, 4].map((page) => (
//             <button
//               key={page}
//               className={`px-3 py-2 rounded-lg transition-colors ${
//                 page === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//           <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LostFound;
import React, { useState, useEffect } from 'react';
import { databases, storage } from '../services/appwrite';
import AddItemForm from '../components/AddItemForm';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID_ITEMS = import.meta.env.VITE_APPWRITE_ITEMS_COLLECTION_ID;
const BUCKET_ID_IMAGES = import.meta.env.VITE_APPWRITE_BUCKET;

const LostFound = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_ITEMS
        );
        
        const fetchedItems = response.documents.map(doc => {
          const imageUrl = storage.getFileView(BUCKET_ID_IMAGES, doc.imageId);
          console.log(imageUrl);
          return { ...doc, image: imageUrl };
          
        });

        setItems(fetchedItems.reverse()); // Show newest first
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [newItem, ...prevItems]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lost & Found</h1>
        <AddItemForm onAddItem={handleAddItem} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.$id} className="border rounded-lg p-4 shadow-lg">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">Location: {item.location}</p>
            <p className="text-gray-500 text-sm">Time: {new Date(item.time).toLocaleString()}</p>
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${item.status === 'lost' ? 'bg-red-500' : 'bg-green-500'}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostFound;


