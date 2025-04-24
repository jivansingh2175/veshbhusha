// === ProductDetails.jsx ===
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

const sizes = [
  { label: "S", available: true, stock: 5 },
  { label: "M", available: true, stock: 1 },
  { label: "L", available: true, stock: 3 },
  { label: "XL", available: false, stock: 0 },
];

const products = [
  {
    id: 1,
    name: "Benetton White Tee",
    subtitle: "Stylish Cotton Oversized T-shirt",
    price: 499,
    mrp: 799,
    discount: 38,
    rating: 4.2,
    reviews: 124,
    img: "/assets/product/tshirt1.jpg",
    sizes: [ { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true }, ],
  },
  {
    id: 2,
    name: "Classic Blue Jeans",
    subtitle: "Slim Fit Stretchable Denim",
    price: 1199,
    mrp: 1599,
    discount: 25,
    rating: 4.5,
    reviews: 321,
    img: "/assets/product/jeans1.jpg",
    sizes:[ { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: true },
      { label: "36", available: false }, ],
  },
  {
    id: 3,
    name: "Athleisure Tracksuit",
    subtitle: "Performance Sportswear Set",
    price: 1499,
    mrp: 2199,
    discount: 32,
    rating: 4.7,
    reviews: 211,
    img: "/assets/product/sportwear1.jpg",
    sizes: [ { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true }, ],
  },
  {
    id: 4,
    name: "Black Track Pants",
    subtitle: "Comfortable Everyday Joggers",
    price: 799,
    mrp: 1199,
    discount: 33,
    rating: 4.3,
    reviews: 87,
    img: "/assets/product/trackpant.webp",
    sizes: [   { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true }, ],
  },
  {
    id: 5,
    name: "Casual Checked Shirt",
    subtitle: "Full Sleeve Cotton Shirt",
    price: 899,
    mrp: 1299,
    discount: 31,
    rating: 4.0,
    reviews: 102,
    img: "/assets/product/shirt4.jpg",
    sizes: [  { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: false }, ],
  },
  {
    id: 6,
    name: "Rugged Denim Jeans",
    subtitle: "Vintage Wash Relaxed Fit",
    price: 1099,
    mrp: 1499,
    discount: 27,
    rating: 4.1,
    reviews: 78,
    img: "/assets/product/jeans4.jpg",
    sizes: [ { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: true },
      { label: "36", available: false }, ],
  },
  {
    id: 7,
    name: "Light Blue Shirt",
    subtitle: "Smart Casual Semi-Formal Shirt",
    price: 999,
    mrp: 1399,
    discount: 28,
    rating: 4.4,
    reviews: 156,
    img: "/assets/product/shirt3.jpg",
    sizes: [  { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: false }, ],
  },
  {
    id: 8,
    name: "Dark Wash Jeans",
    subtitle: "High Rise Skinny Fit",
    price: 1299,
    mrp: 1799,
    discount: 28,
    rating: 4.6,
    reviews: 98,
    img: "/assets/product/jeans3.jpg",
    sizes: [ { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: true },
      { label: "36", available: false }, ],
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState("");

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError("Please select a size");
      return;
    }

    const selectedSizeData = product.sizes.find(size => size.label === selectedSize);
    if (!selectedSizeData || !selectedSizeData.available) {
      setSizeError("Selected size is not available");
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      selectedSize,
      quantity: 1
    });

    setAddedToCart(true);
    setSizeError("");
    toast.success("Added to cart!");
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleWishlist = () => {
    if (!selectedSize) {
      setSizeError("Please select a size");
      return;
    }

    const inWishlist = isInWishlist(product.id, selectedSize);

    if (inWishlist) {
      removeFromWishlist(product.id, selectedSize);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        selectedSize
      });
      toast.success("Added to wishlist!");
    }
    setSizeError("");
  };

  const inWishlist = isInWishlist(product.id, selectedSize);

  return (
    <div className="details-wrapper">
      <div className="details-main">
        <img className="details-img" src={product.img} alt={product.name} />
        <div className="details-info">
          <h2 className="details-title">{product.name}</h2>
          <p className="details-subtitle">{product.subtitle}</p>

          <div className="rating-bar">
            <span className="rating">{product.rating} ★</span>
            <span className="reviews"> | {product.reviews} Ratings</span>
          </div>

          <div className="price-box">
            ₹{product.price}{" "}
            <span className="mrp">MRP ₹{product.mrp}</span>{" "}
            <span className="off">({product.discount}% OFF)</span>
          </div>

          <p className="tax-info">Inclusive of all taxes</p>

          <div className="size-section">
            <h4>Select Size</h4>
            <div className="size-buttons">
              {product.sizes.map((size) => (
                <button
                  key={size.label}
                  disabled={!size.available}
                  className={`size-btn ${
                    selectedSize === size.label ? "selected" : ""
                  } ${!size.available ? "disabled" : ""}`}
                  onClick={() => {
                    setSelectedSize(size.label);
                    setSizeError("");
                  }}
                >
                  {size.label}{" "}
                  {size.stock === 1 && <span className="stock">1 left</span>}
                </button>
              ))}
            </div>
            {sizeError && <p className="error-message">{sizeError}</p>}
          </div>

          <div className="action-buttons">
            <button 
              className="add-btn" 
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              {addedToCart ? "Added!" : "ADD TO BAG"}
            </button>
            <button className="wishlist-btn" onClick={toggleWishlist}>
              {inWishlist ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )}{" "}
              WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;