const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    product: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {type: Number},
        price: {type: Number},
        taxPrice: {type: Number},
        shippingPrice: {type: Number},
        totalPrice: {type: Number},
      },
    ],
  },
  {timestamps: true}
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
