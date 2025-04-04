import React from "react";
import "./ProductGrid.css"; // Import the custom CSS

const products = [
  {
    id: 1,
    name: "The Catalyzer",
    price: "$16.00",
    img: "/assets/image1.png",
  },
  {
    id: 2,
    name: "Shooting Stars",
    price: "$21.15",
    img: "https://dummyimage.com/421x261",
  },
  {
    id: 3,
    name: "Neptune",
    price: "$12.00",
    img: "https://dummyimage.com/422x262",
  },
  {
    id: 4,
    name: "The 400 Blows",
    price: "$18.40",
    img: "https://dummyimage.com/423x263",
  },
  {
    id: 5,
    name: "The Catalyzer",
    price: "$16.00",
    img: "https://dummyimage.com/424x264",
  },
  {
    id: 6,
    name: "Shooting Stars",
    price: "$21.15",
    img: "https://dummyimage.com/425x265",
  },
  {
    id: 7,
    name: "Neptune",
    price: "$12.00",
    img: "https://dummyimage.com/427x267",
  },
  {
    id: 8,
    name: "The 400 Blows",
    price: "$18.40",
    img: "https://dummyimage.com/428x268",
  },
];

const ProductGrid = () => {
  return (
    <section className="product-section">
      <h2 className="feature-head">Featured Products</h2>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-category">CATEGORY</h3>
              <h2 className="product-title">{product.name}</h2>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
