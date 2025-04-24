import React, { useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = () => {
  const categories = [
    { name: "Shirts", image: "/assets/product/shirt.png" },
    { name: "T-Shirts", image: "/assets/product/tshirt.jpg" },
    { name: "Jeans", image: "/assets/product/jeans3.jpg" },
    { name: "Sport Wear", image: "/assets/product/sportwear1.jpg" },
  ];

  const allProducts = [
    {
      id: 1,
      name: "Benetton White Tee",
      price: 499,
      category: "T-Shirts",
      img: "/assets/product/tshirt1.jpg",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.5
    },
    {
      id: 2,
      name: "Classic Blue Jeans",
      price: 1199,
      category: "Jeans",
      img: "/assets/product/jeans1.jpg",
      sizes: ["28", "30", "32", "34"],
      rating: 4.2
    },
    {
      id: 3,
      name: "Athleisure Tracksuit",
      price: 1499,
      category: "Sport Wear",
      img: "/assets/product/sportwear1.jpg",
      sizes: ["S", "M", "L","XL"],
      rating: 4.7
    },
    {
     
    id: 4,
    name: "Black Track Pants",
    category: "Sport Wear",
    price: 799,
    img: "/assets/product/trackpant.webp",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.3
    },
    {
      id: 5,
      name: "Casual Checked Shirt",
      category: "Shirts",
      price: 899,
      img: "/assets/product/shirt4.jpg",
      sizes: ["S", "M", "L","XL"],
      rating: 4.8
    },
    {
      id: 6,
    name: "Rugged Denim Jeans",
    category: "Jeans",
    price: 1099,
    img: "/assets/product/jeans4.jpg",
      sizes: ["28", "30", "32","34"],
      rating: 4.1
    },
    {
      id: 7,
      name: "Light Blue Shirt",
      category: "Shirts",
      price: 999,
      img: "/assets/product/shirt3.jpg",
      sizes: ["S", "M", "L","xl"],
      rating: 4.4
    },
    {
      id: 8,
      name: "Dark Wash Jeans",
      category: "Jeans",
      price: 1299,
      img: "/assets/product/jeans3.jpg",
      sizes: ["28", "30", "32", "34"],
      rating: 4.6
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState({});
  const productsPerPage = 8;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.category === selectedCategory)
    : allProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-page">
      {/* Categories Section */}
      <section className="categories-section">
        <h1 className="section-title">Shop by Category</h1>
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.name}
              className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.name)}
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-header">
          <h2 className="section-title">
            {selectedCategory ? `${selectedCategory}` : "All Products"}
          </h2>
          <div className="sort-filter">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" onChange={handleSortChange} value={sortOption}>
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={product.img} alt={product.name} className="product-image" />
                  <div className="product-badge">{product.rating} ★</div>
                </div>
                <div className="product-info">
                  <h3 className="product-category">{product.category}</h3>
                  <h2 className="product-title">{product.name}</h2>
                  <p className="product-price">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>

              {/* Size Selection */}
              <div className="size-selector">
                <p className="size-label">Select Size:</p>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${
                        selectedSizes[product.id] === size ? 'selected' : ''
                      }`}
                      onClick={() => handleSizeSelect(product.id, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="add-to-cart-btn">
                Add to Cart {selectedSizes[product.id] && `(${selectedSizes[product.id]})`}
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={currentPage === num ? 'active' : ''}
              >
                {num}
              </button>
            ))}
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Product;