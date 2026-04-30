import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
 
  const location = useLocation();

 
  const getLinkClass = (path) => {
    return location.pathname === path 
      ? "text-stone-900 font-semibold border-b-2 border-primary pb-1" 
      : "text-stone-500 hover:text-stone-800 transition-colors";
  };

  return (
 
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="flex justify-between items-center h-20 px-6 md:px-10 max-w-screen-2xl mx-auto font-noto-serif text-stone-800">
        
        
        <Link to="/" className="text-2xl font-semibold tracking-tight text-stone-900">
          M&L Skincare
        </Link>

      
        <nav className="hidden md:flex gap-8">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/login" className={getLinkClass("/login")}>Login</Link>
          <Link to="/register" className={getLinkClass("/register")}>Register</Link>
          <Link to="/about" className={getLinkClass("/about")}>About</Link>
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

     
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100 px-6 py-4 flex flex-col gap-4 font-manrope text-lg">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={getLinkClass("/")}>Home</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className={getLinkClass("/login")}>Login</Link>
          <Link to="/register" onClick={() => setIsMenuOpen(false)} className={getLinkClass("/register")}>Register</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className={getLinkClass("/about")}>About</Link>
        </div>
      )}
    </header>
  );
}

export default Header;