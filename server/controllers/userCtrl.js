const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Product = require("../models/productModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = {...this.queryString};
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

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
        return res.status(400).json({message: "All fields are required."});
      }
      const foundUser = await User.findOne({email}).exec();
      if (!foundUser) {
        return res.status(401).json({message: "This email not register."});
      }
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match)
        return res.status(401).json({message: "Email and password not match."});
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
        sameSite: "None",
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
      res.clearCookie("jwt", {httpOnly: true, sameSite: "None"});
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
      const features = new APIfeatures(User.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const users = await features.query;
      return res.json({status: "success", result: users.length, users: users});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getUser: async (req, res) => {
    const user = await User.findById(req.id)
      .select("-password")
      .populate("cart.product");
    if (!user) return res.status(400).json({message: "User does not Exists."});
    return res.json({user});
  },
  getCart: async (req, res) => {
    try {
      const user = await User.findById(req.id).select("cart");
      if (!user)
        return res.status(400).json({message: "User does not Exists."});
      const userCart = [];
      for (const ca of user.cart) {
        const product = await Product.findById(ca.product).select(
          "_id title image description content category brand price stock"
        );
        userCart.push({product, quantity: ca.quantity});
      }
      return res.json(userCart);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await User.findById(req.id);
      if (!user)
        return res.status(400).json({message: "User doest not Exists."});
      await User.findOneAndUpdate(
        {_id: req.id},
        {
          cart: req.body.cart,
        }
      );
      return res.json({message: "Added to cart."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = userCtrl;
