// === Navbar.jsx ===
import React, { useState } from "react";
import "./Navbar.css";
import { Button, Badge, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/AuthContext";
import AccountDrawer from "../Drawer/AccountDrawer";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const AccountDrawerContent = () => (
    <div className="account-drawer-content">
      <div className="user-info-section">
        <div className="user-avatar">
          <UserOutlined style={{ fontSize: '64px' }} />
        </div>
        <h3>{user?.email}</h3>
        <p>Member since {user?.metadata?.creationTime}</p>
      </div>

      <div className="account-menu">
        <Button type="text" block style={{ textAlign: 'left' }} onClick={() => navigate('/account/orders')}>My Orders</Button>
        <Button type="text" block style={{ textAlign: 'left' }} onClick={() => navigate('/account/wishlist')}>Wishlist</Button>
        <Button type="text" block style={{ textAlign: 'left' }} onClick={() => navigate('/account/settings')}>Account Settings</Button>
      </div>

      <div className="logout-section">
        <Button icon={<LogoutOutlined />} onClick={handleLogout} danger block>Logout</Button>
      </div>
    </div>
  );

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
        </nav>

        <div className="navbar-actions">
          <Link to="/wishlist" className="icon-btn">
            <HeartOutlined style={{ fontSize: "20px" }} />
          </Link>

          <Link to="/cart" className="icon-btn">
            <Badge count={cartCount} size="small">
              <ShoppingCartOutlined style={{ fontSize: "20px" }} />
            </Badge>
          </Link>

          {user ? (
            <Button icon={<UserOutlined />} onClick={() => setDrawerVisible(true)} className="account-btn">Account</Button>
          ) : (
            <Link to="/login">
              <Button type="primary" style={{ backgroundColor: "#FF523B" }}>Login</Button>
            </Link>
          )}
        </div>
      </div>

      <Drawer
        title="My Account"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={350}
        closable
      >
        <AccountDrawerContent />
      </Drawer>
      <AccountDrawer open={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </header>
  );
};

export default Navbar;
