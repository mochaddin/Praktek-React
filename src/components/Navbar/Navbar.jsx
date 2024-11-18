import { useId } from 'react';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

export default function Navbar({ onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <nav className="bg-[#2C3E50] p-4 rounded-lg shadow-lg flex justify-between items-center">
      {/* Logo/Home Link */}
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/" className="text-white font-bold text-lg hover:text-[#1abc9c] transition-all duration-300 ease-in-out">
            Home
          </Link>
        </li>
      </ul>

      {/* Search Bar */}
      <ul className="flex justify-center items-center">
        <li className="w-full max-w-xs">
          <input
            type="text"
            className="text-gray-800 px-4 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-[#1abc9c] transition-all duration-300 ease-in-out"
            name="search"
            id={inputId}
            placeholder="Search product..."
            onChange={handleSearchInput}
          />
        </li>
      </ul>

      {/* Conditional Rendering based on login status */}
      {!isLoggedIn ? (
        <ul className="flex gap-4 justify-end items-center">
          <li>
            <button
              onClick={login}
              className="text-white hover:text-[#1abc9c] transition-all duration-300 ease-in-out"
            >
              Sign in
            </button>
          </li>
          <li>
            <Link
              className="text-white hover:text-[#1abc9c] transition-all duration-300 ease-in-out"
              to="/signup"
            >
              Sign up
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-6 justify-end items-center">
          <li>
            <Link
              to="/cart"
              className="text-white hover:text-[#1abc9c] transition-all duration-300 ease-in-out"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="text-white hover:text-[#1abc9c] transition-all duration-300 ease-in-out"
            >
              My Orders
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="text-white hover:text-[#1abc9c] transition-all duration-300 ease-in-out"
            >
              Sign out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
