const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createCategory: async (req, res) => {
    try {
      const {name, image} = req.body;
      const category = await Category.findOne({name});
      if (category)
        return res
          .status(400)
          .json({message: "This Category Already Created."});
      const newCategory = new Category({
        name: name.toLowerCase(),
        image,
      });
      await newCategory.save();
      return res.json({message: "Category Created."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Product.findOne({category: req.params.id});
      if (products)
        return res.status(400).json({
          message: "Please delete all product of this category first.",
        });
      await Category.findByIdAndDelete(req.params.id);
      return res.json({message: "Category Deleted."});
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  },
  updateCategory: async (req, res) => {
    try {
      const {id, name, image} = req.body;
      if (!id || !name || !image) {
        return res.status(400).json({message: "All fields are required."});
      }
      const category = await Category.findById(id).exec();
      if (!category) {
        return res.status(400).json({message: "Category not found."});
      }
      category.name = name;
      category.image = image;
      await category.save();
      return res.status(200).json({message: "Category updated successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = categoryCtrl;
