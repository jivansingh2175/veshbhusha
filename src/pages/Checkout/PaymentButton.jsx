import React, { useState } from 'react';
import './PaymentButton.css';

const PaymentButton = ({ amount, cartItems, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Invalid payment amount.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) throw new Error('Failed to load Razorpay SDK');

      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your test key
        amount: (amount * 100).toString(),
        currency: 'INR',
        name: 'Demo Store',
        description: 'Test Transaction',
        handler: function (response) {
          alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
          onPaymentSuccess({
            items: cartItems,
            total: amount,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        alert(`Payment Failed!\nError: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      setError(err.message || 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Pay ₹{amount.toFixed(2)}</h2>
      <p className="test-mode-notice">Using Razorpay Test Mode - No real money required</p>

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="pay-button"
      >
        {loading ? 'Opening Razorpay...' : 'Pay Now'}
      </button>

      <div className="test-credentials">
        <p>Use these test card details:</p>
        <ul>
          <li><strong>Card Number:</strong> 4111 1111 1111 1111</li>
          <li><strong>Expiry:</strong> Any future date</li>
          <li><strong>CVV:</strong> 123</li>
          <li><strong>Name:</strong> Any name</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentButton;
