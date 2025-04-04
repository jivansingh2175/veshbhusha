import React, { useState } from "react";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router";
import "./Signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Sign Up Form */}
      <div className="container1">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>

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
                  <a href="/">Coupons</a>
                </li>
                <li>
                  <a href="/">Blog post</a>
                </li>
                <li>
                  <a href="/">Return policy</a>
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
                <a href="/">
                  <img src="/assets/icon/facebook.png" alt="Facebook" />
                </a>
                <a href="/">
                  <img src="/assets/icon/instagram.png" alt="Instagram" />
                </a>
                <a href="/">
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

export default SignUp;
