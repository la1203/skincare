import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://skincare-backend-0nc9.onrender.com/api';

function Header({ user, setUser }) {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);

      navigate('/login');

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <header className="p-6 flex justify-between items-center">

      <h1 className="text-3xl font-bold">
        M&L Skincare
      </h1>

      <nav className="flex gap-6">

        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/add-product">Add Product</Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </nav>

    </header>
  );
}

export default Header;