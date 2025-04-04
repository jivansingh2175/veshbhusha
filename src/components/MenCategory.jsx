import React from "react";
import "./MenCategory.css";

const categories = [
  //to add images in circle you have to add the path to the image value of key image 
  { label: "Flat 50% Off", image: "sale.png" },
  { label: "All Men", image: "all-men.jpg" },
  { label: "New In", image: "new-in.jpg" },
  { label: "Casual Shirts", image: "casual-shirts.jpg" },
  { label: "Bottomwear", image: "bottomwear.jpg" },
  { label: "Tees & Polos", image: "tees-polos.jpg" },
  { label: "Workwear", image: "workwear.jpg" },
  { label: "Linen Shop", image: "linen-shop.jpg" },
  { label: "Basics", image: "basics.jpg" },
  { label: "Nightwear", image: "nightwear.jpg" }
];

const MenCategory = () => {
  return (
    <div className="men-category">
      <h2>MEN</h2>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-image">
              <img src={category.image} alt={category.label} />
            </div>
            <p className="category-label">{category.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenCategory;