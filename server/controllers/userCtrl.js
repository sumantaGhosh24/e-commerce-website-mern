const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const userCtrl = {
  register: async (req, res) => {
    try {
      const {
        email,
        mobileNumber,
        password,
        cf_password,
        firstName,
        lastName,
        username,
        dob,
        gender,
        city,
        state,
        country,
        zip,
        addressline1,
        addressline2,
        image,
      } = req.body;
      const errors = [];
      for (const key in req.body) {
        if (!req.body[key]) {
          errors.push(`Please fill ${key} field.`);
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({message: errors});
      }
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).json({message: "Please Enter a Valid Email."});
      }
      if (!mobileNumber.match(/^\d{10}$/)) {
        return res
          .status(400)
          .json({message: "Please Enter a Valid Mobile Number."});
      }
      const userEmail = await User.findOne({email});
      if (userEmail) {
        return res.status(400).json({message: "This Email Already Register."});
      }
      const userMobileNumber = await User.findOne({mobileNumber});
      if (userMobileNumber) {
        return res
          .status(400)
          .json({message: "This Mobile Number Already Register."});
      }
      const matchUsername = await User.findOne({username});
      if (matchUsername) {
        return res
          .status(400)
          .json({message: "This username already register, try another one."});
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({message: "Password Length must be 6 Character Long."});
      }
      if (password !== cf_password) {
        return res
          .status(400)
          .json({message: "Password and Confirm Password not Match."});
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        mobileNumber,
        password: passwordHash,
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        username: username.toLowerCase(),
        image,
        dob,
        gender: gender.toLowerCase(),
        city: city.toLowerCase(),
        state: state.toLowerCase(),
        country: country.toLowerCase(),
        zip,
        addressline1: addressline1.toLowerCase(),
        addressline2: addressline2.toLowerCase(),
      });
      await newUser.save();
      return res.status(201).json({message: "User registration successful!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        return res.status(400).json({message: "All fields are required"});
      }
      const foundUser = await User.findOne({email}).exec();
      if (!foundUser) {
        return res.status(401).json({message: "Unauthorized"});
      }
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) return res.status(401).json({message: "Unauthorized"});
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            role: foundUser.role,
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
      );
      const refreshToken = jwt.sign(
        {email: foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({accessToken});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  refresh_token: (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.status(401).json({message: "Unauthorized"});
      const refreshToken = cookies.jwt;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) return res.status(403).json({message: "Forbidden"});
          const foundUser = await User.findOne({
            email: decoded.email,
          }).exec();
          if (!foundUser)
            return res.status(401).json({message: "Unauthorized"});
          const accessToken = jwt.sign(
            {
              UserInfo: {
                email: foundUser.email,
                role: foundUser.role,
                id: foundUser._id,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
          );
          res.json({accessToken});
        }
      );
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  logout: (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204);
      res.clearCookie("jwt", {httpOnly: true});
      res.json({message: "Cookie cleared"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user)
        return res.status(400).json({message: "User does not exists."});
      res.json({message: "User Deleted."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      if (!users)
        return res.status(400).json({message: "Users does not exists."});
      return res.json(users);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getUser: async (req, res) => {
    const user = await User.findById(req.id).select("-password");
    if (!user) return res.status(400).json({message: "User does not exists."});
    return res.json(user);
  },
  getDashboard: async (req, res) => {
    try {
      const brandCount = await Brand.estimatedDocumentCount();
      const categoryCount = await Category.estimatedDocumentCount();
      const orderCount = await Order.estimatedDocumentCount();
      const productCount = await Product.estimatedDocumentCount();
      const reviewCount = await Review.estimatedDocumentCount();
      const userCount = await User.estimatedDocumentCount();
      const totalPrice = await Order.aggregate([
        {$group: {_id: null, amount: {$sum: "$totalPrice"}}},
      ]);
      const price = await Order.aggregate([
        {$group: {_id: null, amount: {$sum: "$price"}}},
      ]);
      const taxPrice = await Order.aggregate([
        {$group: {_id: null, amount: {$sum: "$taxPrice"}}},
      ]);
      const shippingPrice = await Order.aggregate([
        {$group: {_id: null, amount: {$sum: "$shippingPrice"}}},
      ]);
      const sellProduct = await Product.aggregate([
        {$group: {_id: null, sell: {$sum: "$sell"}}},
      ]);
      const activeUser = await User.find({status: "active"}).count();
      const inActiveUser = await User.find({status: "inactive"}).count();
      const totalAdmin = await User.find({role: "admin"}).count();
      const totalUser = await User.find({role: "user"}).count();
      return res.json({
        brandCount,
        categoryCount,
        orderCount,
        productCount,
        reviewCount,
        userCount,
        totalPrice,
        price,
        taxPrice,
        shippingPrice,
        sellProduct,
        activeUser,
        inActiveUser,
        totalAdmin,
        totalUser,
      });
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = userCtrl;
