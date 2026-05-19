import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // إرسال البيانات للسيرفر للتحقق منها
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      }, { withCredentials: true }); // <-- أضيفي هذا الجزء
      
      // إذا تم تسجيل الدخول بنجاح
      alert('Login successful! Welcome back.');
      // نجبر المتصفح على عمل تحديث فوري لكي يقرأ الهيدر الجلسة الجديدة
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

        {/* عرض رسالة الخطأ إذا وجدت */}
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
            className="w-full py-3 bg-primary text-white rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;