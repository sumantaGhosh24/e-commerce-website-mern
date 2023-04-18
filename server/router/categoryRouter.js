const express = require("express");

const categoryCtrl = require("../controllers/categoryCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(authAdmin, categoryCtrl.createCategory)
  .put(authAdmin, categoryCtrl.updateCategory);

router.route("/category/:id").delete(authAdmin, categoryCtrl.deleteCategory);

module.exports = router;
