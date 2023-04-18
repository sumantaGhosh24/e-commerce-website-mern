const express = require("express");

const brandCtrl = require("../controllers/brandCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router
  .route("/brand")
  .get(brandCtrl.getBrands)
  .post(authAdmin, brandCtrl.createBrand)
  .put(authAdmin, brandCtrl.updateBrand);

router.route("/brand/:id").delete(authAdmin, brandCtrl.deleteBrand);

module.exports = router;
