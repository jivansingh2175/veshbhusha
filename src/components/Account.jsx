import React, { useState, useEffect } from "react";
import "./Account.css";

const Account = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  useEffect(() => {
    fetchUserDetails();
    fetchUserOrders();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data);
      setUpdatedUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUser(updatedUser);
        setEditing(false);
      } else {
        console.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== orderId));
      } else {
        console.error("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <div className="account-container">
      <h1>My Account</h1>

      {/* User Details */}
      <div className="account-section">
        <h2>User Details</h2>
        {editing ? (
          <div>
            <input
              type="text"
              value={updatedUser.username}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, username: e.target.value })
              }
              placeholder="Username"
            />
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="password"
              value={updatedUser.password}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, password: e.target.value })
              }
              placeholder="New Password"
            />
            <button onClick={handleUpdateUser}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </div>
        )}
      </div>

      {/* Order Tracking */}
      <div className="account-section">
        <h2>Order History</h2>
        {orders.length > 0 ? (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Product:</strong> {order.product}
                </p>
                <p>
                  <strong>Price:</strong> ${order.price}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                {order.status !== "Delivered" && (
                  <button onClick={() => handleDeleteOrder(order.id)}>
                    Cancel Order
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders placed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
