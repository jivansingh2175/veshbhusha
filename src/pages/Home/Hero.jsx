import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';
import MenCategory from "../MenCategeory/MenCategory";



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
  {[
    { name: "Shirts", image: "/assets/product/shirt.png" },
    { name: "T-Shirts", image: "/assets/product/tshirt.jpg" },
    { name: "Jeans", image: "/assets/product/jeans2.jpg" },
    { name: "Sport Wear", image: "/assets/product/sportwear.jpg" },
  ].map((category, index) => (
    <Link
      key={index}
      to={`/category/${category.name.replace(/\s+/g, "-").toLowerCase()}`}
      className="category"
    >
      <img src={category.image} alt={category.name} />
      <h3>{category.name}</h3>
    </Link>
  ))}
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
