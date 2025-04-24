// const functions = require("firebase-functions");
// const Razorpay = require("razorpay");
// const cors = require("cors")({ origin: true });

// const razorpay = new Razorpay({
//   key_id: "YOUR_KEY_ID",
//   key_secret: "YOUR_KEY_SECRET",
// });

// exports.createOrder = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     try {
//       const { amount, currency, receipt } = req.body;

//       const order = await razorpay.orders.create({
//         amount: amount * 100, // ₹ to paise
//         currency,
//         receipt,
//       });

//       res.status(200).send(order);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       res.status(500).send("Something went wrong");
//     }
//   });
// });
