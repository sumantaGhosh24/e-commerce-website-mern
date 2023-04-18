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
  updateOrder: async (req, res) => {
    try {
      const {orderStatus, isPaid, isDeliverd, paidAt, deliverAt, id} = req.body;
      const order = await Order.findById(id).exec();
      if (!order) {
        return res.status(400).json({message: "Order not found."});
      }
      order.orderStatus = orderStatus;
      order.isPaid = isPaid;
      order.isDeliverd = isDeliverd;
      order.paidAt = paidAt;
      order.deliverAt = deliverAt;
      await order.save();
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
