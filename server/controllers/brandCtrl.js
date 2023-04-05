const Brand = require("../models/brandModel");
const Product = require("../models/productModel");

const brandCtrl = {
  getBrands: async (req, res) => {
    try {
      const brands = await Brand.find().populate(
        "createdBy",
        "_id username email mobileNumber image"
      );
      return res.json({brands});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createBrand: async (req, res) => {
    try {
      const {name, image} = req.body;
      const createdBy = req.id;
      const brand = await Brand.findOne({name});
      if (brand)
        return res.status(400).json({message: "This Brand Already Created."});
      const newBrand = new Brand({
        name: name.toLowerCase(),
        image,
        createdBy,
      });
      await newBrand.save();
      return res.json({message: "Brand Created."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteBrand: async (req, res) => {
    try {
      const products = await Product.findOne({brand: req.params.id});
      if (products)
        return res.status(400).json({
          message: "Please Delete All Product of this Brand First.",
        });
      await Brand.findByIdAndDelete(req.params.id);
      return res.json({message: "Brand Deleted."});
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  },
  updateBrand: async (req, res) => {
    try {
      const {name, image} = req.body;
      const cat = {name, image};
      const brand = await Brand.findByIdAndUpdate(req.params.id, cat, {
        new: true,
      });
      if (!brand)
        return res.status(400).json({message: "This Brand Does Not Exists."});
      return res.json({message: "Brand Updated."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = brandCtrl;
