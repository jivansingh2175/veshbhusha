import React, { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { NavLink } from "react-router-dom";
// import PaymentButton from "../Checkout/PaymentButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setError("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent! Check your inbox.");
      setShowModal(false);
      setResetEmail("");
      setError("");
    } catch (err) {
      setError("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div>
      {/* Login Form */}
      <div className="container1">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        {resetMessage && <p className="success">{resetMessage}</p>}

        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>

        <p>
          <a
            onClick={() => setShowModal(true)}
            className="forgot-password-btn"
          >
            Forgot Password?
          </a>
        </p>

        <p>
          Don't have an account? <NavLink to="/signup">Signup</NavLink>
        </p>
      </div>

      {/* Password Reset Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handlePasswordReset}>Send Reset Email</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
                <li><a href="/">Coupons</a></li>
                <li><a href="/">Blog post</a></li>
                <li><a href="/">Return policy</a></li>
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
                <a href="/"><img src="/assets/icon/facebook.png" alt="Facebook" /></a>
                <a href="/"><img src="/assets/icon/instagram.png" alt="Instagram" /></a>
                <a href="/"><img src="/assets/icon/twitter.png" alt="Twitter" /></a>
              </div>
            </div>
          </div>
          <hr />
          <p className="footer-bottom">&copy; 2025 Men's Wear. All Rights Reserved.</p>
        </div>
      </footer>
      {/* <PaymentButton/> */}
    </div>
  );
};

export default Login;
