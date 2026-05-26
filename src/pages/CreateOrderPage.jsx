import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateOrderPage = () => {
  const [rentStart, setRentStart] = useState('');
  const [rentEnd, setRentEnd] = useState('');
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');
  const [availableItems, setAvailableItems] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/items');
        setAvailableItems(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = (item) => {
    const sudahAda = items.find((i) => {
      return i.item_id === item.id;
    });
    if (!sudahAda) {
      setItems([
        ...items,
        {
          item_id: item.id,
          quantity: 1,
          price_per_day: item.price_per_day,
        },
      ]);
      // console.log(items);
    } else {
      setItems(
        items.map((i) => {
          if (i.item_id === item.id) {
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        })
      );
    }
  };

  const handleDecreaseItem = (item) => {
    if (item.quantity > 1) {
      setItems(
        items.map((i) => {
          if (i.item_id === item.item_id) {
            return { ...i, quantity: i.quantity - 1 };
          }
          return i;
        })
      );
    } else {
      setItems(
        items.filter((i) => {
          return i.item_id !== item.item_id;
        })
      );
    }
  };

  const handleRemoveItem = (item) => {
    setItems(
      items.filter((i) => {
        return i.item_id !== item.item_id;
      })
    );
  };

  console.log('items sekarang:', items);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/order',
        {
          rent_start: rentStart,
          rent_end: rentEnd,
          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/orders');
    } catch (error) {
      const data = error.response.data;
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setErrors([{ path: 'server', msg: data.message }]);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buat Pesanan</h1>
        <p className="text-gray-500 mb-8">Pilih barang dan tanggal sewa kamu</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom kiri - daftar barang */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Daftar Barang
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-200"
                >
                  <div className="bg-blue-50 rounded-lg h-24 flex items-center justify-center mb-3">
                    <span className="text-4xl">⛺</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-blue-500 font-medium mb-1">
                    Rp {Number(item.price_per_day).toLocaleString('id-ID')}/hari
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    Stok: {item.stock}
                  </p>
                  <button
                    onClick={() => {
                      handleAddItem(item);
                      setErrors([]);
                    }}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
                  >
                    + Tambah
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom kanan - keranjang dan form */}
          <div className="lg:col-span-1">
            {/* Form tanggal */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Tanggal Sewa
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Mulai
                </label>
                <input
                  type="date"
                  value={rentStart}
                  onChange={(e) => {
                    setRentStart(e.target.value);
                    setErrors([]);
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Selesai
                </label>
                <input
                  type="date"
                  value={rentEnd}
                  onChange={(e) => {
                    setRentEnd(e.target.value);
                    setErrors([]);
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Keranjang */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                🛒 Keranjang
              </h2>
              {items.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  Belum ada barang dipilih
                </p>
              ) : (
                items.map((item) => {
                  const barang = availableItems.find(
                    (i) => i.id === item.item_id
                  );
                  return (
                    <div
                      key={item.item_id}
                      className="flex justify-between items-center py-3 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {barang?.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Rp{' '}
                          {Number(item.price_per_day).toLocaleString('id-ID')}
                          /hari
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            handleDecreaseItem(item);
                            setErrors([]);
                          }}
                          className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 font-bold"
                        >
                          -
                        </button>
                        <span className="font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            handleAddItem(barang);
                            setErrors([]);
                          }}
                          className="w-8 h-8 bg-blue-100 rounded-full hover:bg-blue-200 font-bold text-blue-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            handleRemoveItem(item);
                            setErrors([]);
                          }}
                          className="w-8 h-8 bg-red-100 rounded-full hover:bg-red-200 font-bold text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Error */}
            {errors.length > 0 && (
              <div className="bg-red-50 rounded-xl p-4 mb-4">
                {errors.map((error) => (
                  <p key={error.path} className="text-red-500 text-sm">
                    {error.msg}
                  </p>
                ))}
              </div>
            )}

            {/* Tombol sewa */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition duration-200 text-lg"
            >
              Sewa Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
