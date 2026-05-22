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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {orders.map((order) => {
          return (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold">Mulai Sewa: {order.rent_start}</h2>
              <p className="text-gray-500">Selesai: {order.rent_end}</p>
              <p className="text-blue-500">Total Harga: {order.total_price}</p>
              <p className="text-blue-500">Status: {order.status}</p>
              <p className="text-blue-500">Order Dibuat: {order.created_at}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
