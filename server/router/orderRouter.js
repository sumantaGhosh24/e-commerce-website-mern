const express = require("express");

const orderCtrl = require("../controllers/orderCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/orders", authAdmin, orderCtrl.getOrders);

router.put("/order", auth, orderCtrl.updateOrder);

router.get("/order", auth, orderCtrl.getUserOrder);

module.exports = router;
