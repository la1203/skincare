import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import AddProduct from './pages/AddProduct';

const API_URL = 'https://skincare-backend-0nc9.onrender.com/api';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    axios.get(`${API_URL}/auth/me`, {
      withCredentials: true
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch(() => {
      setUser(null);
    });

  }, []);

  return (
    <Router>

      <Header user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>

    </Router>
  );
}

export default App;