import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

//  Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//  Register User
export const registerUser = async (req, res) => {
  const { name, email, password, role, address, phone } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      req.flash("error", "User already exists, please login.");
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password, role, address, phone });

    await user.save();

    req.flash("success", "Registration successful! You are now logged in.");
    req.session.user = user;

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//  Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash("error", "Invalid credentials, please try again.");
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      req.flash("error", "Invalid Email or Password.");
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    req.flash("success", "Login successful!");
    req.session.user = user;

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Logout User
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }
    req.flash("info", "Logged out successfully.");
    res.json({ message: "Logged out" });
  });
};
