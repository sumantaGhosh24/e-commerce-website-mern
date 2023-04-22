const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },

    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zip: {
      type: Number,
      trim: true,
    },
    addressline1: {
      type: String,
      trim: true,
    },
    addressline2: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      default: "active",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {timestamps: true}
);

userSchema.index({
  email: "text",
  mobileNumber: "text",
  username: "text",
  firstName: "text",
  lastName: "text",
});

const User = mongoose.model("User", userSchema);

User.createIndexes({
  email: "text",
  mobileNumber: "text",
  username: "text",
  firstName: "text",
  lastName: "text",
});

module.exports = User;
