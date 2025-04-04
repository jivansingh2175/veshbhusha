import React from "react";
import "./Product.css";
import { Link } from "react-router";

const Product = () => {
  return (
    <div>
      {/* Categories */}
      <h1>Men's Wear Categories</h1>
      <div className="categories">
        {["Shirts", "T-Shirts", "Jeans", "Sport Wear"].map((category, index) => (
          <div className="category" key={index}>
            <img src={`/assets/product/shirt.png`} alt={category} />
            <h3>{category}</h3>
          </div>
        ))}
      </div>

      {/* Product List */}
      <div className="small-container">
        <div id="sort">
          <h2>All Products</h2>
          <select>
            <option>Default Sorting</option>
            <option>Sort by price</option>
            <option>Sort by popularity</option>
            <option>Sort by rating</option>
            <option>Sort by sale</option>
          </select>
        </div>

        <div className="row">
          {Array(8).fill(0).map((_, index) => (
            <div className="col-4" key={index}>
              <img src="/assets/image4.jpg" alt="Product" />
              <h4>Green Printed T-shirt</h4>
              <p>$400.00</p>
            </div>
          ))}
        </div>

        <div className="page-btn">
          {[1, 2, 3, 4].map(num => (
            <span key={num}>{num}</span>
          ))}
          <span>&#8594;</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section about">
              <h2>Men's Wear</h2>
              <p>Your go-to destination for premium men's fashion.</p>
            </div>
            <div className="footer-section links">
              <h2>Useful Links</h2>
              <ul>
                <li><a href="#">Coupons</a></li>
                <li><a href="#">Blog Post</a></li>
                <li><a href="#">Return Policy</a></li>
              </ul>
            </div>
            <div className="footer-section contact">
              <h2>Contact Us</h2>
              <p>Phone: +123 456 7890</p>
            </div>
            <div className="footer-section social">
              <h2>Follow Us</h2>
              <div className="social-icons">
                <a href="#"><img src="/assets/icon/facebook.png" alt="Facebook" /></a>
                <a href="#"><img src="/assets/icon/instagram.png" alt="Instagram" /></a>
                <a href="#"><img src="/assets/icon/twitter.png" alt="Twitter" /></a>
              </div>
            </div>
          </div>
          <hr />
          <p className="footer-bottom">&copy; 2025 Men's Wear. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Product;
