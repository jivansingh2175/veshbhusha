import React from "react";
import "./Navbar.css"; // Import the CSS file
import { Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import DrawerBtn from "./Drawer";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
          <Link to="/" className="navbar-logo">
            <img src="/assets/image1.png" className="logo" alt="logo" />
            <span>Veshbhusha</span>
          </Link>
        
        <nav className="navbar-nav">
          <Link to="/">Home</Link>
          <Link to="/product">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/account">Account</Link>
        </nav>
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
        <DrawerBtn/>
      </div>
    </header>
  );
};

export default Navbar;
