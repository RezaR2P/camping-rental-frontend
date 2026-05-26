import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-blue-500 font-bold text-2xl">
        ⛺ Camping Rental
      </Link>
      <div className="flex gap-4 items-center">
        {token ? (
          <>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/orders"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-200"
            >
              Pesanan
            </Link>
            <Link
              to="/orders/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-medium transition duration-200"
            >
              + Sewa Sekarang
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-500 font-medium transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-medium transition duration-200"
            >
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
