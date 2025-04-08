import {
  detectUser,
  login,
  register,
  logout,
  allUsers,
  changeUserRole,
} from "../controllers/authController.js";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/me", detectUser);
router.get("/logout", logout);
router.get("/get-all-users", allUsers);
router.patch("/change-user-role", changeUserRole);

export default router;
