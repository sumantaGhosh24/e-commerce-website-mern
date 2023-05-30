const express = require("express");

const productCtrl = require("../controllers/productCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/p-products", productCtrl.getPaginationProducts);

router.get("/products", productCtrl.getProducts);

router.post("/product", authAdmin, productCtrl.createProduct);

router.put("/product", authAdmin, productCtrl.updateProduct);

router.delete("/product/:id", authAdmin, productCtrl.deleteProduct);

module.exports = router;
