require("dotenv").config();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentCtrl = {
  getRazorpay: async (req, res) => {
    try {
      const {orderItems} = req.body;
      let totalPrices = [];
      let quantitys = [];
      for (let i = 0; i < orderItems.length; i++) {
        const price = await Product.findById(orderItems[i].product).select(
          "price -_id"
        );
        quantitys.push(orderItems[i].quantity);
        totalPrices.push(price.price);
      }
      let price = 0;
      let taxPrice;
      let shippingPrice;
      let totalPrice;
      for (let i = 0; i < totalPrices.length; i++) {
        let num = Number(totalPrices[i]) * Number(quantitys[i]);
        price += num;
        taxPrice = (18 / 100) * price;
        shippingPrice = (15 / 100) * price;
        totalPrice = price + taxPrice + shippingPrice;
      }
      const options = {
        amount: Number(totalPrice * 100),
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
      } = req.body;
      const user = req.id;
      let totalPrices = [];
      let quantitys = [];
      for (let i = 0; i < orderItems.length; i++) {
        const price = await Product.findById(orderItems[i].product).select(
          "price -_id"
        );
        quantitys.push(orderItems[i].quantity);
        totalPrices.push(price.price);
      }
      let price = 0;
      let taxPrice;
      let shippingPrice;
      let totalPrice;
      for (let i = 0; i < totalPrices.length; i++) {
        let num = Number(totalPrices[i]) * Number(quantitys[i]);
        price += num;
        taxPrice = (18 / 100) * price;
        shippingPrice = (15 / 100) * price;
        totalPrice = price + taxPrice + shippingPrice;
      }
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
        orderStatus: "que",
        price,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
        paidAt: date_time,
      });
      await newOrder.save();
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
