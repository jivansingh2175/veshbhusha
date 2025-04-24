// import React, { useState } from "react";
// import { useCart } from "../../context/cartContext";
// import { toast } from "react-toastify";
// import { db } from "../../firebase/firebaseConfig";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import "./CartPage.css";
// import PaymentButton from "../Checkout/PaymentButton";

// const CartPage = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQty,
//     decreaseQty,
//     clearCart,
//     loading,
//   } = useCart();

//   const cartTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const [checkoutStep, setCheckoutStep] = useState("cart");

//   const handleCartAction = async (action, productId, selectedSize) => {
//     const itemKey = `${productId}-${selectedSize || "onesize"}`;

//     try {
//       switch (action) {
//         case "remove":
//           await removeFromCart(productId, selectedSize);
//           toast.success("Item removed");
//           break;
//         case "increase":
//           await increaseQty(productId, selectedSize);
//           break;
//         case "decrease":
//           await decreaseQty(productId, selectedSize);
//           break;
//         default:
//           throw new Error("Invalid action");
//       }
//     } catch (error) {
//       toast.error(`Failed to ${action} item`);
//     }
//   };

//   const saveOrderToFirestore = async (paymentInfo) => {
//     try {
//       await addDoc(collection(db, "orders"), {
//         items: paymentInfo.items,
//         total: paymentInfo.total,
//         paymentInfo: {
//           paymentId: paymentInfo.paymentId,
//           orderId: paymentInfo.orderId,
//           signature: paymentInfo.signature,
//         },
//         createdAt: Timestamp.now(),
//       });
//       toast.success("Order placed successfully!");
//       // Clear the cart after saving order
//       await clearCart();
//     } catch (err) {
//       console.error("Failed to store order in Firestore:", err);
//       toast.error("Failed to save order. Please try again.");
//     }
//   };

//   const handlePaymentSuccess = async (paymentInfo) => {
//     try {
//       // Save order to Firestore after successful payment
//       await saveOrderToFirestore(paymentInfo);
//       toast.success("Payment successful and order confirmed!");
//     } catch (error) {
//       toast.error("There was an error processing the order.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//         <p>Loading your cart...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <h2>Your Shopping Cart</h2>
//       <div className="cart-header">
//         <span>
//           {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
//         </span>
//       </div>

//       {checkoutStep === "cart" && (
//         cartItems.length === 0 ? (
//           <div className="empty-cart">
//             <img src="/images/empty-cart.svg" alt="Empty cart" />
//             <h3>Your cart is empty</h3>
//             <a href="/products" className="continue-shopping-btn">
//               Continue Shopping
//             </a>
//           </div>
//         ) : (
//           <>
//             <div className="cart-items-container">
//               {cartItems.map((item) => {
//                 const key = `${item.productId}-${item.selectedSize || "onesize"}`;
//                 return (
//                   <div key={key} className="cart-item">
//                     <img src={item.img || "/images/product-placeholder.jpg"} alt={item.name} />
//                     <div className="details">
//                       <h3>{item.name}</h3>
//                       <p>Size: {item.selectedSize || "One Size"}</p>
//                       <div className="qty">
//                         <button onClick={() => handleCartAction("decrease", item.productId, item.selectedSize)} disabled={item.quantity <= 1}>-</button>
//                         <span>{item.quantity}</span>
//                         <button onClick={() => handleCartAction("increase", item.productId, item.selectedSize)}>+</button>
//                       </div>
//                       <button onClick={() => handleCartAction("remove", item.productId, item.selectedSize)} className="remove-btn">Remove</button>
//                     </div>
//                     <div className="total">₹{(item.price * item.quantity).toFixed(2)}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="cart-summary">
//               <div className="row"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
//               <div className="row total"><span>Total</span><span>₹{cartTotal.toFixed(2)}</span></div>
//               <button onClick={() => setCheckoutStep("details")} className="checkout-btn">Proceed to Checkout</button>
//             </div>
//           </>
//         )
//       )}

//       {checkoutStep === "details" && (
//         <div className="checkout-details">
//           <h3>Order Details</h3>
//           <div className="order-summary">
//             <div><strong>Subtotal:</strong> ₹{cartTotal.toFixed(2)}</div>
//             <div><strong>Total:</strong> ₹{cartTotal.toFixed(2)}</div>
//           </div>
//           <PaymentButton
//   amount={cartTotal}  // Passing the total amount to the PaymentButton component
//   cartItems={cartItems}  // Pass cart items as well to handle the order
//   onPaymentSuccess={handlePaymentSuccess}  // Handle success after payment
// />
//         </div>
//       )}
//     </div>
//   );
// };

// // Inside CartPage.jsx

// export default CartPage;

import React, { useState } from "react";
import { useCart } from "../../context/cartContext";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./CartPage.css";
import PaymentButton from "../Checkout/PaymentButton";
import { useNavigate } from "react-router-dom";


// Clean and validate cart items
const sanitizeCartItems = (items) => {
  if (!Array.isArray(items)) {
    console.error("Invalid cart items:", items);
    return [];
  }

  return items.map((item, index) => ({
    name: item?.name || `Unnamed Product #${index + 1}`,
    productId: item?.productId || `unknown-${index}`,
    quantity: item?.quantity || 1,
    price: item?.price || 0,
    selectedSize: item?.selectedSize || "One Size",
    img: item?.img || "/images/product-placeholder.jpg",
  }));
};

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    loading,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState("cart");
  
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const navigate = useNavigate();
  const cartTotal = safeCartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleCartAction = async (action, productId, selectedSize) => {
    try {
      switch (action) {
        case "remove":
          await removeFromCart(productId, selectedSize);
          toast.success("Item removed");
          break;
        case "increase":
          await increaseQty(productId, selectedSize);
          break;
        case "decrease":
          await decreaseQty(productId, selectedSize);
          break;
        default:
          throw new Error("Invalid action");
      }
    } catch (error) {
      toast.error(`Failed to ${action} item`);
    }
  };

  const saveOrderToFirestore = async (paymentInfo) => {
    try {
      const sanitizedItems = sanitizeCartItems(
        paymentInfo.items || safeCartItems
      );
      const total = paymentInfo.total || cartTotal;

      if (sanitizedItems.length === 0 || isNaN(total) || total <= 0) {
        toast.error("Invalid order data. Please try again.");
        return;
      }

      await addDoc(collection(db, "orders"), {
        items: sanitizedItems,
        total,
        paymentInfo: {
          paymentId: paymentInfo.paymentId,
          orderId: paymentInfo.orderId,
          signature: paymentInfo.signature,
        },
        createdAt: Timestamp.now(),
      });

      toast.success("Order placed successfully!");
      await clearCart();
    } catch (err) {
      console.error("Error saving order:", err);
      toast.error("Failed to save order. Please try again.");
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      console.log('Payment response:', paymentResponse); // Debug log
      
      // Validate minimum required payment info
      if (!paymentResponse?.paymentId) {
        throw new Error(
          paymentResponse?.error?.message || 
          'Payment verification failed - missing payment ID'
        );
      }
  
      // Prepare complete order data
      const orderData = {
        paymentInfo: {
          paymentId: paymentResponse.paymentId,
          orderId: paymentResponse.orderId || `temp-${Date.now()}`,
          signature: paymentResponse.signature || 'none',
          method: paymentResponse.method || 'unknown',
          status: 'completed'
        },
        items: safeCartItems,
        total: cartTotal,
        userDetails,
        createdAt: Timestamp.now(),
        status: 'processing'
      };
  
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Order saved with ID:', docRef.id);
      
      // Clear cart only after successful save
      await clearCart();
      
      // Redirect to confirmation with order data
      navigate('/order-confirmation', {
        state: { 
          orderData: {
            ...orderData,
            id: docRef.id
          } 
        }
      });
      
    } catch (error) {
      console.error('Payment processing error:', error);
      
      // Show appropriate error message
      const errorMessage = error.message || 'Payment processing failed';
      toast.error(errorMessage);
      
      // Optionally reset checkout step
      setCheckoutStep('payment');
      
      // Return error for further handling
      return { error: true, message: errorMessage };
    }
  };
  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleProceedToCheckout = () => {
    if (!userDetails.name || !userDetails.address || !userDetails.phone) {
      toast.error("Please fill in all the details.");
      return;
    }
    setCheckoutStep("payment");
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (safeCartItems.length === 0) {
    return (
      <div className="empty-cart">
        <img src="/images/empty-cart.svg" alt="Empty cart" />
        <h3>Your cart is empty</h3>
        <a href="/products" className="continue-shopping-btn">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-header">
        <span>
          {safeCartItems.length} {safeCartItems.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {checkoutStep === "cart" && (
        <div className="cart-items-container">
          {safeCartItems.map((item) => {
            const key = `${item.productId}-${item.selectedSize || "onesize"}`;
            return (
              <div key={key} className="cart-item">
                <img
                  src={item.img || "/images/product-placeholder.jpg"}
                  alt={item.name}
                />
                <div className="details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.selectedSize || "One Size"}</p>
                  <div className="qty">
                    <button
                      onClick={() =>
                        handleCartAction(
                          "decrease",
                          item.productId,
                          item.selectedSize
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleCartAction(
                          "increase",
                          item.productId,
                          item.selectedSize
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      handleCartAction(
                        "remove",
                        item.productId,
                        item.selectedSize
                      )
                    }
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                <div className="total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart-summary">
        <div className="row">
          <span>Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="row total">
          <span>Total</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        {checkoutStep === "cart" && (
          <button
            onClick={() => setCheckoutStep("details")}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
        )}
      </div>

      {checkoutStep === "details" && (
        <div className="checkout-details">
          <h3>Order Details</h3>
          <div className="order-summary">
            <div>
              <strong>Subtotal:</strong> ₹{cartTotal.toFixed(2)}
            </div>
            <div>
              <strong>Total:</strong> ₹{cartTotal.toFixed(2)}
            </div>
            <form className="user-details-form">
              <input
                type="text"
                name="name"
                value={userDetails.name}
                placeholder="Full Name"
                onChange={handleUserDetailsChange}
                required
              />
              <input
                type="text"
                name="address"
                value={userDetails.address}
                placeholder="Address"
                onChange={handleUserDetailsChange}
                required
              />
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                placeholder="Phone Number"
                onChange={handleUserDetailsChange}
                required
              />
            </form>
            <button
              onClick={handleProceedToCheckout}
              className="proceed-to-payment-btn"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {checkoutStep === "payment" && (
        <div className="payment-section">
          <PaymentButton
            amount={cartTotal}
            cartItems={safeCartItems}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
