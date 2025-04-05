import {
  detectUser,
  login,
  register,
  logout,
} from "../controllers/authController.js";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", detectUser);
router.get("/", logout);

export default router;
