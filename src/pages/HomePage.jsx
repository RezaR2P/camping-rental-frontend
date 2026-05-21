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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Barang Camping</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => {
          return (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-gray-500">{item.description}</p>
              <p className="text-blue-500">Rp {item.price_per_day}/hari</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
