const express = require("express");

const reviewCtrl = require("../controllers/reviewCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/all-reviews", authAdmin, reviewCtrl.getAllReviews);

router.get("/reviews/:product", reviewCtrl.getReviews);

router.get("/reviews", auth, reviewCtrl.getMyReviews);

router.post("/review/:product", auth, reviewCtrl.createReview);

module.exports = router;
