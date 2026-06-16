import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
                  AI Code Reviewer
                </span>
                <span className="text-teal-400">.</span>
              </h1>
            </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-baseline space-x-1">
                <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-semibold">Dashboard</Link>
                <Link to="/history" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-semibold">History</Link>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-950 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;