import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Button, Input, Select, message, Tabs, Badge, List, Avatar, Card, Tag, Divider } from "antd";
import { 
  UploadOutlined, 
  EditOutlined, 
  LogoutOutlined, 
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TruckOutlined
} from "@ant-design/icons";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./AccountDrawer.css"; // New CSS file for styling

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { Meta } = Card;

const AccountDrawer = ({ open, onClose }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Fetch user data
          const docRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(docRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData(data);
            setUpdatedData(data);
          }

          // Load orders and wishlist
          loadOrders(firebaseUser.uid);
          loadWishlist(firebaseUser.uid);
          
        } catch (error) {
          console.error("Error fetching data: ", error);
          message.error("Failed to load data");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const loadOrders = async (userId) => {
    setLoadingOrders(true);
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const orderSnapshot = await getDocs(ordersQuery);
      setOrders(orderSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        formattedDate: doc.data().createdAt?.toDate 
          ? formatDate(doc.data().createdAt.toDate())
          : "Date not available"
      })));
    } catch (error) {
      console.error("Error fetching orders: ", error);
      message.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadWishlist = async (userId) => {
    try {
      const wishlistSnapshot = await getDocs(
        collection(db, "users", userId, "wishlist")
      );
      setWishlist(wishlistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching wishlist: ", error);
      message.error("Failed to load wishlist");
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'shipped':
        return <TruckOutlined style={{ color: '#1890ff' }} />;
      case 'delivered':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'cancelled':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <FileTextOutlined />;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", user.uid), {
        photoURL: downloadURL,
      });

      setUserData(prev => ({ ...prev, photoURL: downloadURL }));
      message.success("Profile image updated");
    } catch (error) {
      console.error("Error uploading image: ", error);
      message.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), updatedData);
      setUserData(updatedData);
      setEditing(false);
      message.success("Profile updated");
    } catch (error) {
      console.error("Error updating profile: ", error);
      message.error("Failed to update profile");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: "cancelled",
        cancelledAt: new Date()
      });
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: "cancelled" } : order
      ));
      message.success("Order cancelled");
    } catch (error) {
      console.error("Error cancelling order: ", error);
      message.error("Failed to cancel order");
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "wishlist", itemId));
      setWishlist(prev => prev.filter(item => item.id !== itemId));
      message.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing item: ", error);
      message.error("Failed to remove item");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logged out successfully");
      onClose();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out: ", error);
      message.error("Failed to logout");
    }
  };

  const ProfileTab = () => (
    <div className="account-section">
      <h2 className="account-subheading">User Details</h2>
      {editing ? (
        <div className="edit-form">
          <Input
            value={updatedData.username || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
            placeholder="Username"
            style={{ marginBottom: 12 }}
          />
          <Input
            value={updatedData.email || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
            placeholder="Email"
            style={{ marginBottom: 12 }}
          />
          <Input
            value={updatedData.phone || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
            placeholder="Phone"
            style={{ marginBottom: 12 }}
          />
          <Select
            value={updatedData.gender || ""}
            onChange={(value) => setUpdatedData({ ...updatedData, gender: value })}
            style={{ width: '100%', marginBottom: 12 }}
            placeholder="Select Gender"
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
          <TextArea
            value={updatedData.address || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
            placeholder="Address"
            style={{ marginBottom: 12 }}
          />
          <div style={{ marginBottom: 16 }}>
            <label>
              <UploadOutlined /> Profile Picture
              <input 
                type="file" 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
            </label>
            {uploading && <span style={{ marginLeft: 8 }}>Uploading...</span>}
          </div>
          <Button 
            type="primary" 
            onClick={handleUpdate}
            style={{ marginRight: 8 }}
          >
            Save
          </Button>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      ) : (
        <div className="user-info">
          {userData.photoURL ? (
            <div style={{ marginBottom: 16 }}>
              <img 
                src={userData.photoURL} 
                alt="Profile" 
                className="profile-image"
              />
            </div>
          ) : (
            <Avatar size={100} icon={<UserOutlined />} className="profile-avatar" />
          )}
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone || "Not set"}</p>
          <p><strong>Gender:</strong> {userData.gender || "Not set"}</p>
          <p><strong>Address:</strong> {userData.address || "Not set"}</p>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => setEditing(true)}
            className="edit-button"
          >
            Edit Info
          </Button>
        </div>
      )}
    </div>
  );

  const OrdersTab = () => (
    <div className="account-section">
      <h2 className="account-subheading">Order History</h2>
      {loadingOrders ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <Card 
              key={order.id}
              className="order-card"
              title={
                <div className="order-header">
                  <span className="order-id">Order #{order.id.slice(0, 8)}</span>
                  <Tag 
                    icon={getStatusIcon(order.status)} 
                    color={
                      order.status === 'delivered' ? 'success' :
                      order.status === 'cancelled' ? 'error' :
                      order.status === 'shipped' ? 'processing' : 'warning'
                    }
                  >
                    {order.status.toUpperCase()}
                  </Tag>
                </div>
              }
              extra={
                order.status !== "delivered" && order.status !== "cancelled" && (
                  <Button 
                    onClick={() => handleCancelOrder(order.id)}
                    danger
                    size="small"
                  >
                    Cancel Order
                  </Button>
                )
              }
            >
              <div className="order-details">
                <div className="order-items">
                  {order.items?.slice(0, 3).map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.img || "/images/product-placeholder.jpg"} 
                        alt={item.name} 
                        className="item-image"
                      />
                      <div className="item-info">
                        <p className="item-name">{item.name}</p>
                        <p className="item-meta">
                          Size: {item.selectedSize || "One Size"} × {item.quantity}
                        </p>
                      </div>
                      <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  {order.items?.length > 3 && (
                    <p className="additional-items">+ {order.items.length - 3} more items</p>
                  )}
                </div>
                
                <Divider className="order-divider" />
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Order Date:</span>
                    <span>{order.formattedDate}</span>
                  </div>
                  <div className="summary-row">
                    <span>Payment Method:</span>
                    <span>{order.paymentInfo?.method || 'Not specified'}</span>
                  </div>
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{order.total?.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>₹{order.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <ShoppingOutlined className="empty-icon" />
          <p>No orders found</p>
          <Button type="primary" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );

  const WishlistTab = () => (
    <div className="account-section">
      <h2 className="account-subheading">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={wishlist}
          renderItem={item => (
            <List.Item>
              <Card
                cover={
                  <img 
                    alt={item.name} 
                    src={item.image || "/images/product-placeholder.jpg"} 
                    className="wishlist-item-image"
                  />
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<ShoppingOutlined />}
                    className="wishlist-action-button"
                  >
                    Add to Cart
                  </Button>,
                  <Button 
                    danger 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="wishlist-action-button"
                  >
                    Remove
                  </Button>
                ]}
              >
                <Meta
                  title={item.name}
                  description={`₹${item.price}`}
                />
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <div className="empty-state">
          <HeartOutlined className="empty-icon" />
          <p>Your wishlist is empty</p>
          <Button type="primary" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Drawer
      title="My Account"
      placement="right"
      onClose={onClose}
      open={open}
      width={650}
      closable={true}
      className="account-drawer"
      footer={
        <Button 
          icon={<LogoutOutlined />} 
          onClick={handleLogout} 
          danger
          block
          className="logout-button"
        >
          Logout
        </Button>
      }
    >
      {!user ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading account...</p>
        </div>
      ) : (
        <Tabs 
          activeKey={activeTab}
          onChange={setActiveTab}
          tabPosition="left"
          className="account-tabs"
        >
          <TabPane
            tab={
              <span className="tab-label">
                <UserOutlined />
                Profile
              </span>
            }
            key="profile"
          >
            <ProfileTab />
          </TabPane>
          <TabPane
            tab={
              <span className="tab-label">
                <ShoppingOutlined />
                My Orders
                {orders.length > 0 && (
                  <Badge 
                    count={orders.length} 
                    size="small" 
                    className="tab-badge"
                  />
                )}
              </span>
            }
            key="orders"
          >
            <OrdersTab />
          </TabPane>
          <TabPane
            tab={
              <span className="tab-label">
                <HeartOutlined />
                Wishlist
                {wishlist.length > 0 && (
                  <Badge 
                    count={wishlist.length} 
                    size="small" 
                    className="tab-badge"
                  />
                )}
              </span>
            }
            key="wishlist"
          >
            <WishlistTab />
          </TabPane>
        </Tabs>
      )}
    </Drawer>
  );
};

export default AccountDrawer;