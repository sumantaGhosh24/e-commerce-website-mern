const Brand = require("../models/brandModel");
const Product = require("../models/productModel");

const brandCtrl = {
  getBrands: async (req, res) => {
    try {
      const brands = await Brand.find();
      return res.json(brands);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createBrand: async (req, res) => {
    try {
      const {name, image} = req.body;
      const brand = await Brand.findOne({name});
      if (brand)
        return res.status(400).json({message: "This Brand Already Created."});
      const newBrand = new Brand({
        name: name.toLowerCase(),
        image,
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
          message: "Please delete all product of this brand first.",
        });
      await Brand.findByIdAndDelete(req.params.id);
      return res.json({message: "Brand Deleted."});
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  },
  updateBrand: async (req, res) => {
    try {
      const {id, name, image} = req.body;
      if (!id || !name || !image) {
        return res.status(400).json({message: "All fields are required."});
      }
      const brand = await Brand.findById(id).exec();
      if (!brand) {
        return res.status(400).json({message: "Brand not found."});
      }
      brand.name = name;
      brand.image = image;
      await brand.save();
      return res.status(200).json({message: "Brand updated successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = brandCtrl;
