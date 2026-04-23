import React, { useState, useEffect } from 'react';
// تم تعديل المسار ليتناسب مع ملف skincare.js
import products from '../data/skincare';

function MainPage() {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  
  // حالات الفلترة والبحث
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    let results = products;

    // 1. الفلترة بالبحث (Search) - يبحث في اسم المنتج
    if (searchTerm) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. الفلترة حسب نوع البشرة (Skin Type)
    if (selectedSkinType !== "All") {
      results = results.filter(p => p.skinType === selectedSkinType);
    }

    // 3. الترتيب (Sorting)
    if (sortBy === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(results);
  }, [searchTerm, selectedSkinType, sortBy]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Skin Care Products</h1>
      
      {/* شريط التحكم والفلترة */}
      <div className="row mb-4 p-3 bg-white shadow-sm rounded">
        <div className="col-md-4 mb-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by product name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select 
            className="form-select" 
            value={selectedSkinType}
            onChange={(e) => setSelectedSkinType(e.target.value)}
          >
            <option value="All">All Skin Types</option>
            <option value="Oily">Oily</option>
            <option value="Dry">Dry</option>
            <option value="Combination">Combination</option>
            <option value="All">All Types</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select 
            className="form-select" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* عرض المنتجات */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {displayedProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100 shadow-sm text-center p-3">
              {/* تم إزالة الصورة لأنها غير موجودة في البيانات */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{product.name}</h5>
                
                {/* عرض نوع البشرة كشارة ملونة */}
                <div className="mb-3 mt-2">
                  <span className={`badge ${product.skinType === 'Oily' ? 'bg-danger' : product.skinType === 'Dry' ? 'bg-warning' : 'bg-success'}`}>
                    {product.skinType} Skin
                  </span>
                </div>

                <p className="card-text mt-auto">
                  <strong>Rating:</strong> ⭐ {product.rating}
                </p>
                
                <h3 className="card-text text-primary mb-3">${product.price}</h3>
                
                <button className="btn btn-dark w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayedProducts.length === 0 && (
        <div className="text-center mt-5">
          <h3>No products found matching your criteria.</h3>
        </div>
      )}
    </div>
  );
}

export default MainPage;