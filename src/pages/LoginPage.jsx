import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      // console.log(response.data);
      localStorage.setItem('token', response.data.data);
      navigate('/');
    } catch (error) {
      const data = error.response.data;
      if (data.errors) {
        // Error Validasi
        setErrors(data.errors[0].msg);
      } else {
        setErrors(data.message);
      }
      console.log(error.response.data);
      // console.log(error);
    }
    // console.log(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Selamat Datang
        </h1>
        <p className="text-center text-gray-500 mb-6">Masuk ke akun kamu</p>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors('');
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contoh@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors('');
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan password"
          />
        </div>
        {errors && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">
            {errors}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <p className="text-center text-gray-500 mt-4">
          Belum punya akun?{' '}
          <a
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
