import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, phone);
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        phone,
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      const data = error.response.data;
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setErrors(data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Daftar Akun
        </h1>
        <p className="text-center text-gray-500 mb-6">Buat akun baru kamu</p>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors([]);
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors([]);
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contoh@email.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors([]);
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Minimal 8 karakter"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">No HP</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors([]);
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="08xxxxxxxxxx"
          />
        </div>
        {errors.length > 0 && (
          <div className="mb-4 bg-red-50 p-3 rounded-lg">
            {errors.map((error) => (
              <p key={error.path} className="text-red-500 text-sm">
                {error.msg}
              </p>
            ))}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          Daftar
        </button>
        <p className="text-center text-gray-500 mt-4">
          Sudah punya akun?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
