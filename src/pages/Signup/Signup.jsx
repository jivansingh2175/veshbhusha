import React, { useState } from "react";
import { auth,db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        phone,
        gender,
        address: "",
        photoURL: ""
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="container1">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" className="click">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
              <p>Your go-to destination for premium men's fashion. Elevate your style with our exclusive collections.</p>
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
          <p className="footer-bottom">
            &copy; 2025 Men's Wear. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
