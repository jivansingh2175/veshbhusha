// === WishlistPage.jsx ===
import React from "react";
import "./WishlistPage.css";
import { useWishlist } from "../../context/wishlistContext";
import { useCart } from "../../context/cartContext"; 

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart({
      productId: item.productId || item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      size: item.size || "M",
    });
    removeFromWishlist(item.productId || item.id, item.size);
  };

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.img} alt={item.name} />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => handleMoveToCart(item)}>Move to Cart</button>
              <button onClick={() => removeFromWishlist(item.id, item.size)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistPage;
