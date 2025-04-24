import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id && item.selectedSize === product.selectedSize
    );
    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId, selectedSize) => {
    setWishlist(
      wishlist.filter(
        (item) =>
          item.id !== productId || item.selectedSize !== selectedSize
      )
    );
  };

  const isInWishlist = (productId, selectedSize) => {
    return wishlist.some(
      (item) =>
        item.id === productId && item.selectedSize === selectedSize
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
