// // ProductGrid.js
// import React from "react";
// import { Link } from "react-router-dom";
// import "./ProductGrid.css";

// const products =[
//     {
//       id: 1,
//       name: "Tshirt",
//       price: "₹869",
//       img: "/assets/product/tshirt1.jpg",
//     },
//     {
//       id: 2,
//       name: "levis jeans",
//       price: "₹900",
//       img: "/assets/product/jeans1.jpg",
//     },
//     {
//       id: 3,
//       name: "Trackpant",
//       price: "₹500",
//       img: "/assets/product/sportwear1.jpg",
//     },
//     {
//       id: 4,
//       name: "The 400 Blows trackpant",
//       price: "₹600",
//       img: "/assets/product/trackpant.webp",
//     },
//     {
//       id: 5,
//       name: "Rainbow shirt",
//       price: "₹400",
//       img: "/assets/product/shirt4.jpg",
//     },
//     {
//       id: 6,
//       name: "Denim Jeans",
//       price: "₹900",
//       img: "/assets/product/jeans4.jpg",
//     },
//     {
//       id: 7,
//       name: "Nimble Made",
//       price: "₹500",
//       img: "/assets/product/shirt3.jpg",
//     },
//     {
//       id: 8,
//       name: "Madrwell jeans",
//       price: "₹1200",
//       img: "/assets/product/jeans3.jpg",
//     },
// ];

// const ProductGrid = () => {
//   return (
//     <section className="product-section">
//       <h2 className="feature-head">Featured Products</h2>
//       <div className="product-container">
//         {products.map((product) => (
//           <Link to={`/product/${product.id}`} key={product.id} className="product-card">
//             <div className="product-image">
//               <img src={product.img} alt={product.name} />
//             </div>
//             <div className="product-details">
//               <h3 className="product-category">CATEGORY</h3>
//               <h2 className="product-title">{product.name}</h2>
//               <p className="product-price">{product.price}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProductGrid;




import React from "react";
import { Link } from "react-router-dom";
import "./ProductGrid.css";

const products = [
  {
    id: 1,
    name: "Benetton White Tee",
    category: "T-Shirts",
    price: 499,
    img: "/assets/product/tshirt1.jpg",
    sizes: [ { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true }, ],
  },
  {
    id: 2,
    name: "Classic Blue Jeans",
    category: "Jeans",
    price: 1999,
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
    category: "Sport Wear",
    price: 1299,
    img: "/assets/product/sportwear1.jpg",
    sizes: [ { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true }, ],
  },
  {
    id: 4,
    name: "Black Track Pants",
    category: "Sport Wear",
    price: 1499,
    img: "/assets/product/trackpant.webp",
    sizes: [   { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true }, ],
  },
  {
    id: 5,
    name: "Casual Checked Shirt",
    category: "Shirts",
    price: 800,
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
    category: "Jeans",
    price: 900,
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
    category: "Shirts",
    price: 1000, 
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
    category: "Jeans",
    price: 1800,
    img: "/assets/product/jeans3.jpg",
    sizes: [ { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: true },
      { label: "36", available: false }, ],
  },
];

const ProductGrid = () => {
  return (
    <section className="product-section">
      <h2 className="feature-head">Featured Products</h2>
      <div className="product-container">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <div className="product-image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-category">{product.category}</h3>
              <h2 className="product-title">{product.name}</h2>
              <p className="product-price">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;


