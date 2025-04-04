import React from "react";
import { Link } from "react-router";
import "./About.css"; // Import the external CSS file

const About = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="container">
        <div className="navbar">
          <Link to="/">
            <div className="logo">
              <img
                src={process.env.PUBLIC_URL + "/assets/image1.png"}
                alt="Logo"
                width="70px"
              />
            </div>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product">Product</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
            </ul>
          </nav>
          <img
            src={process.env.PUBLIC_URL + "/assets/cart.png"}
            width="18px"
            height="18px"
            alt="Cart"
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/menu.png"}
            className="menu-icon"
            alt="Menu"
          />
        </div>
      </div>

      {/* About Content */}
      <div className="about-container">
        <h1 className="about-title">About Veshbhusha Menswear</h1>
        <p className="about-subtitle">
          Style, Elegance, and Comfort – Redefined
        </p>

        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            At <strong>Veshbhusha Menswear</strong>, we believe that fashion is
            more than just clothing—it's an expression of personality,
            confidence, and culture. Our mission is to bring you a collection of
            premium-quality men’s wear that blends tradition with modern trends,
            ensuring you always look your best for every occasion.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>
              <strong>Premium Quality:</strong> High-quality fabrics for
              durability & comfort.
            </li>
            <li>
              <strong>Elegant Designs:</strong> A mix of classic & contemporary
              fashion.
            </li>
            <li>
              <strong>Affordable Luxury:</strong> Stylish outfits at competitive
              prices.
            </li>
            <li>
              <strong>Customer-Centric:</strong> Focused on providing the best
              shopping experience.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Collection</h2>
          <ul>
            <li>
              <strong>Ethnic Wear:</strong> Kurtas, Sherwanis & Traditional
              Attire.
            </li>
            <li>
              <strong>Formal Wear:</strong> Stylish Shirts, Blazers & Suits.
            </li>
            <li>
              <strong>Casual Wear:</strong> Trendy T-Shirts, Denim & Jackets.
            </li>
            <li>
              <strong>Footwear & Accessories:</strong> Shoes, Belts & More.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Authentic & Handpicked Designs</li>
            <li>Best-in-Class Fabrics & Stitching</li>
            <li>Secure Payments & Hassle-Free Returns</li>
            <li>Fast & Reliable Shipping</li>
          </ul>
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
                <li>
                  <Link to="#">Coupons</Link>
                </li>
                <li>
                  <Link to="#">Blog Post</Link>
                </li>
                <li>
                  <Link to="#">Return Policy</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section contact">
              <h2>Contact Us</h2>
              <p>Phone: +123 456 7890</p>
            </div>
            <div className="footer-section social">
              <h2>Follow Us</h2>
              <div className="social-icons">
                <a href="#">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/icon/facebook.png"}
                    alt="Facebook"
                  />
                </a>
                <a href="#">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/icon/instagram.png"}
                    alt="Instagram"
                  />
                </a>
                <a href="#">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/icon/twitter.png"}
                    alt="Twitter"
                  />
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

export default About;
