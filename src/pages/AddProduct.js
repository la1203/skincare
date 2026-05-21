import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    skinType: 'Oily',
    price: '',
    image: '',
    rating: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_URL}/products`, formData, { withCredentials: true });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding product. Please login first.');
    }
  };

  return (
    <div className="bg-background min-h-screen font-manrope pt-32 pb-20 px-6">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
        <h1 className="font-noto-serif text-3xl text-on-surface mb-2">Add New Product</h1>
        <p className="text-stone-500 mb-8">Share your skincare discovery with the community.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Hydrating Face Cream"
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Skin Type</label>
            <select
              name="skinType"
              value={formData.skinType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container"
            >
              <option value="Oily">Oily</option>
              <option value="Dry">Dry</option>
              <option value="Combination">Combination</option>
              <option value="All">All Skin Types</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="e.g. 29.99"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="e.g. 4.5"
              min="1"
              max="5"
              step="0.1"
              className="w-full px-4 py-3 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary-container text-on-primary-container rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all mt-2"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;