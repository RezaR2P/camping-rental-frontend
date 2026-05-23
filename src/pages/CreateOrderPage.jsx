import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateOrderPage = () => {
  const [rentStart, setRentStart] = useState('');
  const [rentEnd, setRentEnd] = useState('');
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');
  const [availableItems, setAvailableItems] = useState([]);
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
    const sudahAda = items.find((i) => i.item_id === item.id);
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
      console.log(error);
    }
  };
  console.log(availableItems);
  return (
    <div className="flex items-center h-screen bg-gray-100">
      <div>
        <h1>Membuat Orderan</h1>
        <div>
          {availableItems.map((item) => {
            {
              /* console.log(item); */
            }

            return (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.price_per_day}</p>
                <p>{item.stock}</p>
                <button
                  onClick={() => {
                    handleAddItem(item);
                  }}
                >
                  Tambah
                </button>
              </div>
            );
          })}
          <label>Tanggal Dimulai</label>
          <input
            type="date"
            value={rentStart}
            onChange={(e) => {
              setRentStart(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Tanggal Selesai</label>
          <input
            type="date"
            value={rentEnd}
            onChange={(e) => {
              setRentEnd(e.target.value);
            }}
          />
        </div>
        <div>
          <h2>Keranjang</h2>
          {items.map((item) => {
            const barang = availableItems.find((i) => i.id === item.item_id);
            return (
              <div key={item.item_id}>
                <p>{barang?.name}</p>
                <p>quantity: {item.quantity}</p>
              </div>
            );
          })}
        </div>
        <button onClick={handleSubmit}>Sewa</button>
      </div>
    </div>
  );
};

export default CreateOrderPage;
