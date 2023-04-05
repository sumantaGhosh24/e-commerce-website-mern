const Category = require("../models/categoryModel");

function structureCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      parentId: cat.parentId,
      image: cat.image,
      createdBy: cat.createdBy,
      children: structureCategories(categories, cat._id),
    });
  }
  return categoryList;
}

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find().populate(
        "createdBy",
        "_id username email mobileNumber image"
      );
      const categoryList = structureCategories(categories);
      return res.json({categoryList});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createCategory: async (req, res) => {
    try {
      const {name, image, parentId} = req.body;
      const createdBy = req.id;
      const category = await Category.findOne({name});
      if (category)
        return res
          .status(400)
          .json({message: "This Category Already Created."});
      const newCategory = new Category({
        name: name.toLowerCase(),
        image,
        parentId,
        createdBy,
      });
      await newCategory.save();
      return res.json({message: "Category Created."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findOne({category: req.params.id});
      if (category)
        return res.status(400).json({
          message: "Please Delete All Category of this Category First.",
        });
      const cat = await Category.find({parentId: req.params.id});
      if (cat.length === 1)
        return res
          .status(400)
          .json({message: "Please Delete all sub Category of this Category."});
      await Category.findByIdAndDelete(req.params.id);
      return res.json({message: "Category Deleted."});
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  },
  updateCategory: async (req, res) => {
    try {
      const {name, image, parentId} = req.body;
      const cat = {name, image};
      if (parentId !== "") {
        cat.parentId = parentId;
      }
      const category = await Category.findByIdAndUpdate(req.params.id, cat, {
        new: true,
      });
      if (!category)
        return res
          .status(400)
          .json({message: "This Category Does Not Exists."});
      return res.status(200).json({message: "Category updated successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = categoryCtrl;
