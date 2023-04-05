const express = require("express");

const categoryCtrl = require("../controllers/categoryCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(authAdmin, categoryCtrl.createCategory);

router
  .route("/category/:id")
  .delete(authAdmin, categoryCtrl.deleteCategory)
  .put(authAdmin, categoryCtrl.updateCategory);

module.exports = router;
