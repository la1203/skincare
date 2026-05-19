import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); 
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // إضافة withCredentials: true ضروري لإرسال الكوكيز للسيرفر
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => { 
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => setUser(null)); 
  }, [location.pathname, user]); 

  const getLinkClass = (path) => {
    return location.pathname === path 
      ? "text-stone-900 font-semibold border-b-2 border-primary pb-1" 
      : "text-stone-500 hover:text-stone-800 transition-colors";
  };

  const handleLogout = async () => {
    try {
      // إضافة withCredentials: true ضروري لمسح الكوكيز من السيرفر
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setUser(null); 
      window.location.href = '/login'; 
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="flex justify-between items-center h-20 px-6 md:px-10 max-w-screen-2xl mx-auto font-noto-serif text-stone-800">
        
        <Link to="/" className="text-2xl font-semibold tracking-tight text-stone-900">
          M&L Skincare
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          
          {user ? (
            <>
              <span className="text-stone-800 font-semibold">Hello, {user.name}</span>
              <button onClick={handleLogout} className="text-stone-500 hover:text-red-600 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={getLinkClass("/login")}>Login</Link>
              <Link to="/register" className={getLinkClass("/register")}>Register</Link>
            </>
          )}
        </nav>

        <button 
          className="md:hidden text-stone-800 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* قائمة الموبايل */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100 px-6 py-4 flex flex-col gap-4 font-manrope text-lg">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={getLinkClass("/")}>Home</Link>
          
          {user ? (
            <>
              <span className="text-stone-800 font-semibold">Hello, {user.name}</span>
              <button onClick={handleLogout} className="text-left text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className={getLinkClass("/login")}>Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className={getLinkClass("/register")}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;