import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">
        Camping Rental
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="text-white hover:text-blue-200">
          Home
        </Link>
        <Link to="/login" className="text-white hover:text-blue-200">
          Login
        </Link>
        <Link to="/register" className="text-white hover:text-blue-200">
          Register
        </Link>
        <button
          onClick={handleLogout}
          className="text-white hover:text-blue-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
