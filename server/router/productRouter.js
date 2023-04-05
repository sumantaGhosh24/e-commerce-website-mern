const express = require("express");

const productCtrl = require("../controllers/productCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/products", productCtrl.getProducts);

router.post("/product", authAdmin, productCtrl.createProduct);

router
  .route("/product/:id")
  .get(productCtrl.getProduct)
  .put(authAdmin, productCtrl.updateProduct)
  .delete(authAdmin, productCtrl.deleteProduct);

module.exports = router;
