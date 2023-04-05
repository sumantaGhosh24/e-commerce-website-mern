const express = require("express");

const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const loginLimiter = require("../middleware/loginLimiter");

const router = express.Router();

router.post("/register", userCtrl.register);

router.post("/login", loginLimiter, userCtrl.login);

router.get("/refresh_token", userCtrl.refresh_token);

router.get("/logout", userCtrl.logout);

router.delete("/user/:id", authAdmin, userCtrl.deleteUser);

router.get("/users", authAdmin, userCtrl.getUsers);

router.get("/user", auth, userCtrl.getUser);

router.patch("/addcart", auth, userCtrl.addCart);

router.get("/getcart", auth, userCtrl.getCart);

module.exports = router;
