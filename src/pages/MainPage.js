import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://skincare-backend-0nc9.onrender.com/api';

function MainPage() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [user, setUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true); // ✅ إضافة loading state

  // جلب المستخدم الحالي
  useEffect(() => {
    axios.get(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => { if (res.data.user) setUser(res.data.user); })
      .catch(() => setUser(null));
  }, []);

  // جلب المنتجات من السيرفر
  useEffect(() => {
    setLoading(true); // ✅ ابدأ loading
    let query = `?search=${searchTerm}&skinType=${selectedSkinType}&sort=${sortBy}`;
    axios.get(`${API_URL}/products${query}`, { withCredentials: true })
      .then(res => {
        setDisplayedProducts(res.data);
        setLoading(false); // ✅ انتهى loading
      })
      .catch(err => {
        console.log("Error fetching products", err);
        setLoading(false);
      });
  }, [searchTerm, selectedSkinType, sortBy]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/products/${productId}`, { withCredentials: true });
      setDisplayedProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      alert("You can only delete your own products!");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      skinType: product.skinType,
      price: product.price,
      image: product.image,
      rating: product.rating
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/products/${editingProduct._id}`, editForm, { withCredentials: true });
      setDisplayedProducts(prev => prev.map(p =>
        p._id === editingProduct._id ? { ...p, ...editForm } : p
      ));
      setEditingProduct(null);
    } catch (err) {
      alert("You can only edit your own products!");
    }
  };

  return (
    <div className="bg-background text-on-surface font-manrope pt-24">

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="font-noto-serif text-2xl mb-4">Edit Product</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                placeholder="Product Name"
                className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary-container"
              />
              <select
                value={editForm.skinType}
                onChange={(e) => setEditForm({...editForm, skinType: e.target.value})}
                className="w-full px-4 py-3 bg-surface-container rounded-lg border-none"
              >
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Combination">Combination</option>
                <option value="All">All Skin Types</option>
              </select>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                placeholder="Price"
                className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary-container"
              />
              <input
                type="text"
                value={editForm.image}
                onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                placeholder="Image URL"
                className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary-container"
              />
              <input
                type="number"
                value={editForm.rating}
                onChange={(e) => setEditForm({...editForm, rating: e.target.value})}
                placeholder="Rating"
                min="1" max="5" step="0.1"
                className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary-container"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleUpdate}
                  className="flex-1 py-3 bg-primary-container text-on-primary-container rounded-full font-bold hover:scale-[1.02] transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-full font-bold hover:scale-[1.02] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pb-20 px-10 max-w-screen-2xl mx-auto">

        {/* Hero Section */}
        <section className="mb-12 mt-10">
          <h1 className="font-noto-serif text-5xl text-on-surface mb-4 tracking-tight">Discover Your Glow</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Meticulously formulated essentials for every skin ritual. Find the perfect match for your unique texture and needs.
          </p>
        </section>

        {/* Filter Bar */}
        <section className="mb-12 sticky top-4 z-40">
          <div className="bg-white/90 backdrop-blur-xl p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">search</span>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all"
                placeholder="Search products..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-48">
                <select
                  className="w-full appearance-none px-6 py-4 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container font-medium text-stone-800"
                  value={selectedSkinType}
                  onChange={(e) => setSelectedSkinType(e.target.value)}
                >
                  <option value="All">All Skin Types</option>
                  <option value="Oily">Oily</option>
                  <option value="Dry">Dry</option>
                  <option value="Combination">Combination</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">expand_more</span>
              </div>
              <div className="relative w-full md:w-48">
                <select
                  className="w-full appearance-none px-6 py-4 bg-surface-container border-none rounded-lg focus:ring-2 focus:ring-primary-container font-medium text-stone-800"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">swap_vert</span>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Loading State */}
        {loading && (
          <div className="text-center mt-20">
            <p className="text-stone-400 animate-pulse">Loading products, please wait...</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div key={product._id} className="group bg-white rounded-lg p-3 hover:shadow-lg transition-all duration-500 border border-stone-100">
                <div className="relative aspect-square mb-6 overflow-hidden rounded-lg bg-surface-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-noto-serif text-xl text-on-surface mb-1">{product.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        product.skinType === 'Oily' ? 'bg-green-100 text-green-800' :
                        product.skinType === 'Dry' ? 'bg-blue-100 text-blue-800' :
                        product.skinType === 'Combination' ? 'bg-orange-100 text-orange-800' :
                        'bg-stone-100 text-stone-600'
                      }`}>
                        {product.skinType === 'All' ? 'For All Skin Types' : `For ${product.skinType}`}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-on-surface">${product.price}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span className="text-xs font-semibold text-stone-500">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-3 bg-primary-container text-on-primary-container rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all">
                    Add to Ritual
                  </button>

                  {/* ✅ الإصلاح الرئيسي: toString() عشان تشتغل المقارنة صح */}
                  {user && product.creatorId?.toString() === user._id?.toString() && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold hover:bg-blue-200 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold hover:bg-red-200 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {!loading && displayedProducts.length === 0 && (
          <div className="text-center mt-20">
            <h3 className="text-stone-500">No products found matching your criteria.</h3>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[32px] mt-20 bg-[#FFF1E6] font-noto-serif text-sm tracking-wide text-stone-800">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-10 gap-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold">M&L</span>
            <p>© 2024 M&L. Crafted for ritual and clarity.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8">
            <a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-rose-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-rose-400 transition-colors">Shipping</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;