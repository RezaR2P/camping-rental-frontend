import { useState, useEffect } from 'react';
import api from '../services/api';

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/items');
        setItems(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Sewa Perlengkapan Camping
        </h1>
        <p className="text-gray-500 mb-8">
          Pilih perlengkapan camping terbaik untuk petualangan kamu!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200"
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="bg-blue-50 h-40 flex items-center justify-center">
                  <span className="text-4xl">Not Found</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-500 font-bold text-lg">
                    Rp {Number(item.price_per_day).toLocaleString('id-ID')}/hari
                  </p>
                  <p className="text-gray-400 text-sm">Stok: {item.stock}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
