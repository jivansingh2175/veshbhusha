const saveOrderToFirestore = async (paymentInfo) => {
  try {
    const sanitizedItems = sanitizeCartItems(
      paymentInfo?.items || safeCartItems
    );
    const total = paymentInfo?.total || cartTotal;

    if (sanitizedItems.length === 0 || isNaN(total) || total <= 0) {
      toast.error("Invalid order data. Please try again.");
      return;
    }

    // Validate required payment info
    if (!paymentInfo?.paymentId) {
      throw new Error("Payment ID is missing");
    }

    const orderData = {
      items: sanitizedItems,
      total,
      userDetails, // Include user details in the order
      paymentInfo: {
        paymentId: paymentInfo.paymentId,
        orderId: paymentInfo.orderId || "not_provided",
        signature: paymentInfo.signature || "not_provided",
        status: paymentInfo.status || "completed",
      },
      createdAt: Timestamp.now(),
      status: "processing", // Add order status
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("Order saved with ID:", docRef.id);
    
    toast.success("Order placed successfully!");
    await clearCart();
    return docRef.id; // Return order ID for reference
  } catch (err) {
    console.error("Error saving order:", err);
    toast.error(`Failed to save order: ${err.message}`);
    throw err; // Re-throw to allow handling in the calling function
  }
};