import React from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { storeOrderInFirestore } from "../../utils/storeOrder";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 500 * 100,
        currency: "INR",
        receipt: "order_rcptid_11",
      }),
    });

    const data = await res.json();

    const options = {
      key: "YOUR_KEY_ID",
      amount: data.amount,
      currency: data.currency,
      name: "Veshbhusha",
      description: "Product Purchase",
      image: "/logo.png",
      order_id: data.id,
      handler: async function (response) {
        const orderDetails = {
          razorpay_order_id: data.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          amount: data.amount / 100,
          currency: data.currency,
          status: "Paid",
          email: user?.email,
          userId: user?.uid,
          receipt: "order_rcptid_11",
        };

        try {
          await storeOrderInFirestore(orderDetails, user, cartItems);
          clearCart(); // Clear after success
          navigate("/order-confirmation"); // Redirect
        } catch (error) {
          alert("Failed to save order!");
        }
      },
      prefill: {
        name: user?.displayName || "Customer",
        email: user?.email,
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;
