
import React from "react";
import { Link } from "react-router-dom";
import "./MenCategory.css";

const categories = [
  { label: "Flat 50% Off", image: "assets/men/sale.jpg" },
  { label: "All Men", image: "assets/image6.jpg" },
  { label: "New In", image: "assets/men/workwear.jpg" },
  { label: "Casual Shirts", image: "assets/men/new.jpg" },
  { label: "Bottomwear", image: "assets/men/bottomwear.jpg" },
  { label: "Tees & Polos", image: "assets/men/polo.jpg" },
  { label: "Workwear", image: "assets/men/office.jpg" },
  { label: "Linen Shop", image: "assets/men/linen.jpg" },
  { label: "Basics", image: "assets/product/tshirt4.jpg" },
  { label: "Nightwear", image: "assets/product/nightwear.jpg" },
];

const MenCategory = () => {
  return (
    <div className="men-category">
      <h2>MEN</h2>
      <div className="category-container">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.label.replace(/\s+/g, "-").toLowerCase()}`}
            className="category-item"
          >
            <div className="category-image">
              <img src={category.image} alt={category.label} />
              <p className="category-label">{category.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenCategory;
