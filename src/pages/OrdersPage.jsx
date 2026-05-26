import { useState, useEffect } from 'react';
import api from '../services/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pesanan Saya</h1>
        <p className="text-gray-500 mb-8">Daftar semua pesanan sewa kamu</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800">Order #{order.id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : order.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : order.status === 'returned'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-red-100 text-red-600'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  📅 Mulai:{' '}
                  {new Date(order.rent_start).toLocaleDateString('id-ID')}
                </p>
                <p className="text-gray-600">
                  📅 Selesai:{' '}
                  {new Date(order.rent_end).toLocaleDateString('id-ID')}
                </p>
                <p className="text-blue-500 font-bold">
                  💰 Rp {Number(order.total_price).toLocaleString('id-ID')}
                </p>
                <p className="text-gray-400 text-sm">
                  🕐 {new Date(order.created_at).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
