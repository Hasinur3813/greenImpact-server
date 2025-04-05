import User from "../models/User.js";
import bcrypt from "bcrypt";
import { genereteToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({ email: user?.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await User.create({
      ...user,
      password: hashedPassword,
      role: user.role || "donor",
    });

    const token = genereteToken(newUser);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        error: false,
        message: "User created successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid credentials",
      });
    }

    const token = genereteToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        error: false,
        message: "Sussessfully logged in",
      });
  } catch (error) {
    next(error);
  }
};

// detect user in front-end if user is logged in or not
export const detectUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      error: false,
      message: "User is logged in",
      data: { user: decoded },
    });
  } catch (error) {
    next(error);
  }
};
