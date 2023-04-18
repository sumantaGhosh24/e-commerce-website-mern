const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

// class APIfeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }
//   filtering() {
//     const queryObj = {...this.queryString};
//     const excludedFields = ["page", "sort", "limit"];
//     excludedFields.forEach((el) => delete queryObj[el]);
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(
//       /\b(gte|gt|lt|lte|regex)\b/g,
//       (match) => "$" + match
//     );
//     this.query.find(JSON.parse(queryStr));
//     return this;
//   }
//   sorting() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(",").join(" ");
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }
//     return this;
//   }
//   paginating() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 9;
//     const skip = (page - 1) * limit;
//     this.query = this.query.skip(skip).limit(limit);
//     return this;
//   }
// }

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      // const features = new APIfeatures(
      //   Product.find()
      //     .populate("user", "_id username email mobileNumber image")
      //     .populate("category")
      //     .populate("brand"),
      //   req.query
      // )
      //   .filtering()
      //   .sorting()
      //   .paginating();
      // const products = await features.query;
      // return res.json({
      //   status: "success",
      //   result: products.length,
      //   products: products,
      // });

      const products = await Product.find()
        .populate("user", "_id username email mobileNumber image")
        .populate("category")
        .populate("brand");
      return res.json(products);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        category,
        image,
        stock,
        content,
        brand,
      } = req.body;
      const user = req.id;
      const errors = [];
      for (const key in req.body) {
        if (!req.body[key]) {
          errors.push(`Please fill ${key} field.`);
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({message: errors});
      }
      const newProduct = new Product({
        user: user,
        title: title.toLowerCase(),
        price,
        description: description.toLowerCase(),
        category,
        content: content.toLowerCase(),
        image,
        stock,
        brand,
      });
      await newProduct.save();
      return res.status(200).json({message: "Create product successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        category,
        image,
        stock,
        content,
        brand,
        id,
      } = req.body;
      const product = await Product.findById(id).exec();
      if (!product) {
        return res.status(400).json({message: "Product not found."});
      }
      product.title = title;
      product.price = price;
      product.description = description;
      product.category = category;
      product.image = image;
      product.stock = stock;
      product.content = content;
      product.brand = brand;
      await product.save();
      return res.status(200).json({message: "Product updated successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product)
        return res.status(400).json({message: "This Product Does Not Exists."});
      return res.status(200).json({message: "Product delete successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = productCtrl;
