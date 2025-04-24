import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { CheckCircleIcon, PrinterIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.orderData || null);
  const [loading, setLoading] = useState(!location.state?.orderData);
  const [error, setError] = useState(null);

  // Store information
  const storeInfo = {
    name: "Veshbhusha",
    logo: "/assets/image1.png",
    address: "123 Fashion Street, Mumbai, Maharashtra 400001",
    phone: "+91 98765 43210",
    email: "support@veshbhusha.com",
    website: "www.veshbhusha.com"
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          throw new Error("No order ID provided");
        }

        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!order && orderId) {
      fetchOrder();
    }
  }, [orderId, order, location.state]);

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceipt = async () => {
    const receiptElement = document.getElementById("receipt");
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${order?.id || "order"}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  if (loading) {
    return <div className="receipt-loading">Loading receipt...</div>;
  }

  if (error) {
    return (
      <div className="receipt-error">
        <h2>Error Loading Order</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="receipt-error">
        <h2>No Order Found</h2>
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    );
  }

  const orderDate = order.createdAt?.toDate
    ? format(order.createdAt.toDate(), "PPPpp")
    : "Date not available";

  return (
    <div className="receipt-container">
      <div className="receipt-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeftIcon className="icon" />
          Back
        </button>
        <div className="action-buttons">
          <button onClick={handlePrintReceipt} className="print-button">
            <PrinterIcon className="icon" />
            Print
          </button>
          <button onClick={handleDownloadReceipt} className="download-button">
            Download PDF
          </button>
        </div>
      </div>

      <div id="receipt" className="receipt-content">
        {/* Store Header */}
        <div className="store-header">
          <img src={storeInfo.logo} alt={storeInfo.name} className="store-logo" />
          <div className="store-info">
            <h1>{storeInfo.name}</h1>
            <p>{storeInfo.address}</p>
            <p>Phone: {storeInfo.phone} | Email: {storeInfo.email}</p>
            <p>Website: {storeInfo.website}</p>
          </div>
        </div>

        {/* Order Confirmation */}
        <div className="confirmation-header">
          <CheckCircleIcon className="confirmation-icon" />
          <h2>Order Confirmed</h2>
          <p>Thank you for your purchase! Your order has been received.</p>
        </div>

        {/* Order Details */}
        <div className="order-details">
          <div className="order-section">
            <h3>Order Information</h3>
            <div className="detail-row">
              <span>Order ID:</span>
              <span>{order.id}</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span>{orderDate}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className="status">{order.status || "Processing"}</span>
            </div>
            {order.paymentInfo?.paymentId && (
              <div className="detail-row">
                <span>Payment ID:</span>
                <span>{order.paymentInfo.paymentId}</span>
              </div>
            )}
          </div>

          <div className="order-section">
            <h3>Customer Details</h3>
            <div className="detail-row">
              <span>Name:</span>
              <span>{order.userDetails?.name || "Not provided"}</span>
            </div>
            <div className="detail-row">
              <span>Phone:</span>
              <span>{order.userDetails?.phone || "Not provided"}</span>
            </div>
            <div className="detail-row">
              <span>Address:</span>
              <span>{order.userDetails?.address || "Not provided"}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="order-items">
          <h3>Order Summary</h3>
          <div className="items-list">
            {order.items?.map((item, index) => (
              <div key={index} className="item-row">
                <div className="item-info">
                  <img
                    src={item.img || "/images/product-placeholder.jpg"}
                    alt={item.name}
                    className="item-image"
                  />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-meta">
                      Size: {item.selectedSize || "One Size"} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="item-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Totals */}
        <div className="order-totals">
          <div className="total-row">
            <span>Subtotal</span>
            <span>₹{order.total?.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="total-row grand-total">
            <span>Total</span>
            <span>₹{order.total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="receipt-footer">
          <p>If you have any questions, please contact us at {storeInfo.email}</p>
          <p>Thank you for shopping with {storeInfo.name}!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;