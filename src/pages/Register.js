import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skinType, setSkinType] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(''); // مسح أي خطأ سابق
    
    try {
      // إرسال البيانات للسيرفر (Backend) الذي عملناه
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      
      // إذا نجح التسجيل، ننقل المستخدم لصفحة تسجيل الدخول
      alert('Account created successfully! Please login.');
      navigate('/');
      
    } catch (err) {
      // إذا حصل خطأ (مثلاً الإيميل مستخدم مسبقاً)
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 font-manrope">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-stone-100">
        
        <div className="text-center mb-8">
          <h2 className="font-noto-serif text-3xl text-on-surface mb-2">Join M&L Skincare</h2>
          <p className="text-on-surface-variant">Create an account to start your journey</p>
        </div>

        {/* عرض رسالة الخطأ إذا وجدت */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all text-stone-800" 
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Skin Type</label>
            <select 
              className="w-full appearance-none px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all text-stone-800 font-medium"
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              required
            >
              <option value="" disabled>Select your skin type</option>
              <option value="Normal">Normal</option>
              <option value="Dry">Dry</option>
              <option value="Oily">Oily</option>
              <option value="Combination">Combination</option>
              <option value="Sensitive">Sensitive</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-primary text-white rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;