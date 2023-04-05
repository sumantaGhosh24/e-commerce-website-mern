const express = require("express");

const brandCtrl = require("../controllers/brandCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router
  .route("/brand")
  .get(brandCtrl.getBrands)
  .post(authAdmin, brandCtrl.createBrand);

router
  .route("/brand/:id")
  .delete(authAdmin, brandCtrl.deleteBrand)
  .put(authAdmin, brandCtrl.updateBrand);

module.exports = router;
