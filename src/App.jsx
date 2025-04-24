
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Home/Hero";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Product from "./components/ProductCard/Product";
import ProductDetails from "./pages/ProductDetials/productDetails";
import WishlistPage from "./pages/Wishlist/wishlistPage";
import About from "./pages/About/About";
import CartPage from "./pages/Cart/cartPage";
import ContactForm from "./pages/Contact/ContactForm";
import OrderConfirmation from "./pages/Checkout/OrderConfirmation";
// Components


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        // In your App.js
        <Route path="/products" element={<Product />} />  //
        <Route path="/about" element={<About />} />
        {/* <Route path="/account" element={<Account />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/contact" element={<ContactForm />} /> {/* Updated path */}
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

        {/* Catch-all 404 page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
