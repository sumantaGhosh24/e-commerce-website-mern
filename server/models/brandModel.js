const mongoose = require("mongoose");

const brandScheme = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true, unique: true},
    image: {type: Object, required: true},
  },
  {timestamps: true}
);

const Brand = mongoose.model("Brand", brandScheme);

module.exports = Brand;
