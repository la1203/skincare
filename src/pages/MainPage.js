import React, { useState, useEffect } from 'react';
import products from '../data/skincare';

function MainPage() {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSkinType !== "All") {
      results = results.filter(p => p.skinType === selectedSkinType);
    }

    if (sortBy === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(results);
  }, [searchTerm, selectedSkinType, sortBy]);

  return (
    <div className="bg-background text-on-surface font-manrope">
      {/* Top Navigation Bar (Fixed) */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="flex justify-between items-center h-20 px-10 max-w-screen-2xl mx-auto font-noto-serif text-stone-800">
          <div className="flex items-center gap-10">
            <span className="text-2xl font-semibold tracking-tight">M&L</span>
            <nav className="hidden md:flex gap-8">
              <span className="text-stone-900 border-b-2 border-rose-200 pb-1 font-medium cursor-pointer">Home</span>
              <span className="text-stone-500 hover:text-stone-800 cursor-pointer">About</span>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            {/* Header Search Placeholder */}
            <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-2 border border-stone-200">
              <span className="material-symbols-outlined text-stone-500 text-xl">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 text-stone-800" placeholder="Find your ritual..." type="text"/>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-stone-500 font-medium cursor-pointer">Login</span>
              <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-semibold hover:scale-[1.02] transition-transform">Register</button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-10 max-w-screen-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="font-noto-serif text-5xl text-on-surface mb-4 tracking-tight">Discover Your Glow</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Meticulously formulated essentials for every skin ritual. Find the perfect match for your unique texture and needs.
          </p>
        </section>

        {/* Main Filter Bar */}
        <section className="mb-12 sticky top-24 z-40">
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

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg p-3 hover:shadow-lg transition-all duration-500 border border-stone-100">
              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg bg-surface-container">
                {/* عرض الصورة الحقيقية للمنتج */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-500 hover:text-rose-400 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
              </div>
              <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-noto-serif text-xl text-on-surface mb-1">{product.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${product.skinType === 'Oily' ? 'bg-green-100 text-green-800' : product.skinType === 'Dry' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                      For {product.skinType}
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
              </div>
            </div>
          ))}
        </section>

        {displayedProducts.length === 0 && (
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
      
      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl">shopping_bag</span>
      </button>
    </div>
  );
}

export default MainPage;