const express = require("express");

const reviewCtrl = require("../controllers/reviewCtrl");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/reviews/:product", reviewCtrl.getReviews);

router.get("/reviews", auth, reviewCtrl.getMyReviews);

router.post("/review/:product", auth, reviewCtrl.createReview);

module.exports = router;
