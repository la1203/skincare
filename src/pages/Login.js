import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://skincare-backend-0nc9.onrender.com/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 font-manrope">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-stone-100">
        
        <div className="text-center mb-8">
          <h2 className="font-noto-serif text-3xl text-on-surface mb-2">Welcome Back</h2>
          <p className="text-on-surface-variant">Sign in to continue your skincare ritual</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all text-stone-800" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all text-stone-800" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-primary-container text-on-primary-container rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-stone-500 mt-6 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-stone-800 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;