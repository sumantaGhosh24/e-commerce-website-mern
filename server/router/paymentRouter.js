const express = require("express");

const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/razorpay", auth, paymentCtrl.getRazorpay);

router.post("/verification", auth, paymentCtrl.verification);

module.exports = router;
