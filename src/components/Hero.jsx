import React from "react";
import "./Hero.css";
import { Link } from "react-router";
import MenCategory from "./MenCategory";
import ProductGrid from "./ProductGrid";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate('/product');
  };
  return (
    <div>
      {/* Navbar */}
      <div className="header">
        {/* Hero Section */}
        <div className="front-page">
          <div className="text-sec">
            <h1>
              Redefine Your Look With <br />A Fresh New Style!
            </h1>
            <p>
              Style is a reflection of your personality—refresh, redefine,
              <br /> and express yourself with fashion that speaks to you!
            </p>
              <Button className="button-explore" onClick={handleRoute}>Explore Now</Button>
          </div>
          <div className="col-2">
            <img src="/assets/image2.webp" alt="Fashion Banner" />
          </div>
        </div>
      </div>

      {/* main Categories */}
      <MenCategory />

      {/* Product Categories */}
      <h1>Men's Wear Categories</h1>
      <div className="categories">
        <div className="category">
          <img src="/assets/product/shirt.png" alt="Shirts" />
          <h3>Shirts</h3>
        </div>
        <div className="category">
          <img src="/assets/product/shirt.png" alt="T-Shirts" />
          <h3>T-Shirts</h3>
        </div>
        <div className="category">
          <img src="/assets/image6.jpg" alt="Jeans" />
          <h3>Jeans</h3>
        </div>
        <div className="category">
          <img src="/assets/image6.jpg" alt="Sport Wear" />
          <h3>Sport Wear</h3>
        </div>
      </div>

      {/* Featured Products */}
        <ProductGrid />
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section about">
              <h2>Men's Wear</h2>
              <p>
                Your go-to destination for premium men's fashion. Elevate your
                style with our exclusive collections.
              </p>
            </div>
            <div className="footer-section links">
              <h2>Useful Links</h2>
              <ul>
                <li>
                  <a href="#">Coupons</a>
                </li>
                <li>
                  <a href="#">Blog post</a>
                </li>
                <li>
                  <a href="#">Return policy</a>
                </li>
              </ul>
            </div>
            <div className="footer-section contact">
              <h2>Contact Us</h2>
              <p>Email: contact@menswear.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: 123 Street, City, Country</p>
            </div>
            <div className="footer-section social">
              <h2>Follow Us</h2>
              <div className="social-icons">
                <a href="#">
                  <img src="/assets/icon/facebook.png" alt="Facebook" />
                </a>
                <a href="#">
                  <img src="/assets/icon/instagram.png" alt="Instagram" />
                </a>
                <a href="#">
                  <img src="/assets/icon/twitter.png" alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
          <hr />
          <p className="footer-bottom">
            &copy; 2025 Men's Wear. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
