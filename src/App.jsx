import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Product from "./components/Product";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Account from "./components/Account";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
