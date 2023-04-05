const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const orderCtrl = {
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user", "_id username email mobileNumber image")
        .populate("orderItems.product");
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user", "_id username email mobileNumber image")
        .populate("orderItems.product");
      if (!order)
        return res.status(400).json({message: "This Order doest not Exists."});
      return res.json(order);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  updateOrder: async (req, res) => {
    try {
      const {orderStatus, isPaid, isDeliverd} = req.body;
      let paidAt = Date.now();
      let deliverAt = Date.now();
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        {orderStatus, isPaid, paidAt, isDeliverd, deliverAt},
        {new: true}
      );
      if (!order)
        return res.status(400).json({message: "Order doest not Exists."});
      return res.json({message: "Order updated successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getUserOrder: async (req, res) => {
    try {
      const order = await Order.find({user: req.id})
        .populate("user", "_id username email mobileNumber image")
        .populate("orderItems.product");
      if (!order)
        return res.status(400).json({message: "This Order doest not Exists."});
      return res.json(order);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = orderCtrl;
