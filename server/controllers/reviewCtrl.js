const Review = require("../models/reviewModel");

const reviewCtrl = {
  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find({product: req.params.product}).populate(
        "user",
        "username email image"
      );
      if (!reviews) {
        return res.status(400).json({message: "No Review Exists."});
      }
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getMyReviews: async (req, res) => {
    try {
      const reviews = await Review.find({user: req.id}).populate("product");
      if (!reviews) {
        return res.status(400).json({message: "No Review Exists."});
      }
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createReview: async (req, res) => {
    try {
      const {comment, rating} = req.body;
      const product = req.params.product;
      const user = req.id;
      const errors = [];
      for (const key in req.body) {
        if (!req.body[key]) {
          errors.push(`Please Fill ${key} Field.`);
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({message: errors});
      }
      const newReview = new Review({
        product,
        user,
        comment: comment.toLowerCase(),
        rating: Number(rating),
      });
      await newReview.save();
      return res.json({message: "New review created."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = reviewCtrl;
