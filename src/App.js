import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header'; 
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import AddProduct from './pages/AddProduct';
function App() {
  return (
    <Router>
    
      <Header />
      
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