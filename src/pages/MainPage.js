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

  const [editForm, setEditForm] = useState({
    name: "",
    skinType: "",
    price: "",
    image: "",
    rating: ""
  });

  // جلب بيانات المستخدم الحالي
  useEffect(() => {
    axios.get(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => setUser(null));
  }, []);

  // جلب المنتجات
  useEffect(() => {
    let query = `?search=${searchTerm}&skinType=${selectedSkinType}&sort=${sortBy}`;

    axios.get(`${API_URL}/products${query}`, {
      withCredentials: true
    })
      .then(res => setDisplayedProducts(res.data))
      .catch(err => console.log("Error fetching products", err));

  }, [searchTerm, selectedSkinType, sortBy]);

  // حذف منتج
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/products/${productId}`, {
        withCredentials: true
      });

      setDisplayedProducts(prev =>
        prev.filter(product => product._id !== productId)
      );

    } catch (error) {
      // عرض رسالة الخطأ القادمة من الـ Backend
      alert(error.response?.data?.message || "Error deleting product");
    }
  };

  // فتح نافذة التعديل
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

  // حفظ التعديل
  const handleUpdate = async () => {
    try {

      const response = await axios.put(
        `${API_URL}/products/${editingProduct._id}`,
        editForm,
        { withCredentials: true }
      );

      setDisplayedProducts(prev =>
        prev.map(product =>
          product._id === editingProduct._id
            ? response.data // استخدام البيانات المحدثة القادمة من السيرفر
            : product
        )
      );

      setEditingProduct(null);

    } catch (error) {
      // عرض رسالة الخطأ القادمة من الـ Backend
      alert(error.response?.data?.message || "Error updating product");
    }
  };

  return (
    <div className="bg-background text-on-surface font-manrope pt-24">

      {/* نافذة التعديل */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl p-6 w-full max-w-md">

            <h2 className="font-noto-serif text-2xl mb-4">
              Edit Product
            </h2>

            <div className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Product Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    name: e.target.value
                  })
                }
                className="w-full px-4 py-3 bg-surface-container rounded-lg"
              />

              <select
                value={editForm.skinType}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    skinType: e.target.value
                  })
                }
                className="w-full px-4 py-3 bg-surface-container rounded-lg"
              >
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Combination">Combination</option>
                <option value="All">All Skin Types</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    price: e.target.value
                  })
                }
                className="w-full px-4 py-3 bg-surface-container rounded-lg"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={editForm.image}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    image: e.target.value
                  })
                }
                className="w-full px-4 py-3 bg-surface-container rounded-lg"
              />

              <input
                type="number"
                placeholder="Rating"
                min="1"
                max="5"
                step="0.1"
                value={editForm.rating}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    rating: e.target.value
                  })
                }
                className="w-full px-4 py-3 bg-surface-container rounded-lg"
              />

              <div className="flex gap-2 mt-2">

                <button
                  onClick={handleUpdate}
                  className="flex-1 py-3 bg-primary-container text-on-primary-container rounded-full font-bold"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-full font-bold"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      <main className="pb-20 px-10 max-w-screen-2xl mx-auto">

        {/* العنوان */}
        <section className="mb-12 mt-10">

          <h1 className="font-noto-serif text-5xl text-on-surface mb-4 tracking-tight">
            Discover Your Glow
          </h1>

          <p className="text-lg text-on-surface-variant max-w-2xl">
            Meticulously formulated essentials for every skin ritual.
          </p>

        </section>

        {/* البحث والفلترة */}
        <section className="mb-12 sticky top-4 z-40">

          <div className="bg-white/90 backdrop-blur-xl p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">

            <div className="relative flex-1 w-full">

              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
                search
              </span>

              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-lg"
                placeholder="Search products..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

            <div className="flex gap-4 w-full md:w-auto">

              <div className="relative w-full md:w-48">

                <select
                  className="w-full appearance-none px-6 py-4 bg-surface-container border-none rounded-lg"
                  value={selectedSkinType}
                  onChange={(e) => setSelectedSkinType(e.target.value)}
                >
                  <option value="All">All Skin Types</option>
                  <option value="Oily">Oily</option>
                  <option value="Dry">Dry</option>
                  <option value="Combination">Combination</option>
                </select>

              </div>

              <div className="relative w-full md:w-48">

                <select
                  className="w-full appearance-none px-6 py-4 bg-surface-container border-none rounded-lg"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>

              </div>

            </div>

          </div>

        </section>

        {/* المنتجات */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {displayedProducts.map((product) => (

            <div
              key={product._id}
              className="group bg-white rounded-lg p-3 hover:shadow-lg transition-all duration-500 border border-stone-100"
            >

              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg bg-surface-container">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="px-2 pb-2">

                <div className="flex justify-between items-start mb-2">

                  <div>

                    <h3 className="font-noto-serif text-xl text-on-surface mb-1">
                      {product.name}
                    </h3>

                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-stone-100 text-stone-600">

                      {product.skinType === 'All'
                        ? 'For All Skin Types'
                        : `For ${product.skinType}`}

                    </span>

                  </div>

                  <div className="flex flex-col items-end">

                    <span className="text-lg font-bold text-on-surface">
                      ${product.price}
                    </span>

                    <div className="flex items-center gap-1 text-amber-500">

                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>

                      <span className="text-xs font-semibold text-stone-500">
                        {product.rating}
                      </span>

                    </div>

                  </div>

                </div>

                <button className="w-full mt-4 py-3 bg-primary-container text-on-primary-container rounded-full font-bold">
                  Add to Ritual
                </button>

                {/* أزرار التعديل والحذف - تم تعديل الشرط هنا */}
                {user && (product.creatorId?._id || product.creatorId)?.toString() === user._id?.toString() && (

                  <div className="flex gap-2 mt-3">

                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold"
                    >
                      Delete
                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

        </section>

        {/* لا يوجد منتجات */}
        {displayedProducts.length === 0 && (

          <div className="text-center mt-20">

            <h3 className="text-stone-500">
              No products found matching your criteria.
            </h3>

          </div>

        )}

      </main>

    </div>
  );
}

export default MainPage;