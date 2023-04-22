require("dotenv").config();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentCtrl = {
  getRazorpay: async (req, res) => {
    try {
      const {price} = req.body;
      const options = {
        amount: Number(price * 100),
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).json({message: "server error"});
      return res.json(order);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  verification: async (req, res) => {
    try {
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        orderItems,
        shippingAddress,
        price,
        taxPrice,
        shippingPrice,
        totalPrice,
        cartId,
      } = req.body;
      const user = req.id;
      const shasum = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      );
      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
      const digest = shasum.digest("hex");
      if (digest !== razorpaySignature)
        return res.status(400).json({message: "Transaction not legit!"});
      var date_time = new Date();
      const newOrder = new Order({
        user: user,
        orderItems,
        paymentResult: {
          id: orderCreationId,
          status: "success",
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: razorpayPaymentId,
          razorpay_signature: razorpaySignature,
        },
        shippingAddress,
        orderStatus: "pending",
        price,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
        paidAt: date_time,
      });
      await newOrder.save();
      await Cart.findByIdAndDelete(cartId);
      return res.json({
        message: "success",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = paymentCtrl;
