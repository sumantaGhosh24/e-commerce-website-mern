const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const cartCtrl = {
  getCart: async (req, res) => {
    try {
      const userId = req.id;
      const cart = await Cart.findOne({user: userId}).populate(
        "product.product"
      );
      if (!cart) return res.status(400).json({message: "Cart not found."});
      return res.json(cart);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  addCart: async (req, res) => {
    try {
      const userId = req.id;
      const {productId, quantity} = req.body;

      let cart = await Cart.findOne({user: userId});
      if (cart) {
        let productIndex = cart.product.findIndex(
          (p) => p.product == productId
        );
        const pro = await Product.findById(productId).select("price");
        if (productIndex > -1) {
          let productItem = cart.product[productIndex];
          productItem.quantity = quantity;
          productItem.price = pro.price * quantity;
          productItem.taxPrice = (18 / 100) * productItem.price;
          productItem.shippingPrice = (15 / 100) * productItem.price;
          productItem.totalPrice =
            productItem.price +
            productItem.taxPrice +
            productItem.shippingPrice;
          cart.product[productIndex] = productItem;
        } else {
          let price = pro.price;
          let taxPrice = (18 / 100) * price;
          let shippingPrice = (15 / 100) * price;
          let totalPrice = price + taxPrice + shippingPrice;
          cart.product.push({
            product: productId,
            quantity,
            price,
            taxPrice,
            shippingPrice,
            totalPrice,
          });
        }
        cart = await cart.save();
        return res.status(201).json({message: "Cart Updated."});
      } else {
        const pro = await Product.findById(productId).select("price");
        let taxPrice = (18 / 100) * pro.price;
        let shippingPrice = (15 / 100) * pro.price;
        let totalPrice = pro.price + taxPrice + shippingPrice;
        await Cart.create({
          user: userId,
          product: [
            {
              product: productId,
              quantity,
              price: pro.price,
              taxPrice: taxPrice,
              shippingPrice: shippingPrice,
              totalPrice: totalPrice,
            },
          ],
        });
        return res.status(201).json({message: "Cart Updated."});
      }
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  removeCart: async (req, res) => {
    try {
      const userId = req.id;
      const productId = req.params.id;
      let cart = await Cart.findOne({user: userId});
      let productIndex = cart.product.findIndex((p) => p.product == productId);
      if (productIndex > -1) {
        cart.product.splice(productIndex, 1);
      }
      cart = await cart.save();
      return res.status(201).json({message: "Product remove to cart."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = cartCtrl;
