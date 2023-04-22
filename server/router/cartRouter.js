const express = require("express");

const cartCtrl = require("../controllers/cartCtrl");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/cart", auth, cartCtrl.getCart);

router.post("/cart", auth, cartCtrl.addCart);

router.delete("/cart/:id", auth, cartCtrl.removeCart);

module.exports = router;
