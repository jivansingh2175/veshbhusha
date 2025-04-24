// src/context/cartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  remove,
  update,
} from "firebase/database";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const database = getDatabase();

  // Fetch cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCartItems([]);
        return;
      }

      setLoading(true);
      try {
        const cartRef = ref(database, `users/${user.uid}/cart`);
        const snapshot = await get(cartRef);
        if (snapshot.exists()) {
          const items = Object.entries(snapshot.val()).map(([id, item]) => ({
            id,
            ...item,
          }));
          setCartItems(items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        toast.error("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (item) => {
    if (!user) return toast.error("Please login to add items");

    try {
      const existing = cartItems.find(
        (c) => c.productId === item.productId && c.selectedSize === item.selectedSize
      );

      if (existing) {
        const updatedQuantity = existing.quantity + 1;
        const itemRef = ref(database, `users/${user.uid}/cart/${existing.id}`);
        await update(itemRef, { quantity: updatedQuantity });

        setCartItems((prev) =>
          prev.map((c) =>
            c.id === existing.id ? { ...c, quantity: updatedQuantity } : c
          )
        );
        toast.success("Increased item quantity");
      } else {
        const newItemRef = push(ref(database, `users/${user.uid}/cart`));
        const newItem = { ...item, quantity: 1 };
        await set(newItemRef, newItem);

        setCartItems((prev) => [...prev, { ...newItem, id: newItemRef.key }]);
        toast.success("Added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) return;
    try {
      await remove(ref(database, `users/${user.uid}/cart/${itemId}`));
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const increaseQty = async (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item || !user) return;

    try {
      const updatedQuantity = item.quantity + 1;
      await update(ref(database, `users/${user.uid}/cart/${itemId}`), {
        quantity: updatedQuantity,
      });

      setCartItems((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, quantity: updatedQuantity } : i
        )
      );
      toast.success("Increased quantity");
    } catch (error) {
      console.error("Error increasing quantity:", error);
      toast.error("Failed to increase quantity");
    }
  };

  const decreaseQty = async (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item || !user) return;

    try {
      if (item.quantity === 1) {
        await removeFromCart(itemId);
      } else {
        const updatedQuantity = item.quantity - 1;
        await update(ref(database, `users/${user.uid}/cart/${itemId}`), {
          quantity: updatedQuantity,
        });

        setCartItems((prev) =>
          prev.map((i) =>
            i.id === itemId ? { ...i, quantity: updatedQuantity } : i
          )
        );
        toast.success("Decreased quantity");
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      toast.error("Failed to decrease quantity");
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await remove(ref(database, `users/${user.uid}/cart`));
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
