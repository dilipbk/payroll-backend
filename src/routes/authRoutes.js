import express from "express";
import {
  login,
  protect,
  authorize,
  registerUser,
} from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

// Login route
router.post(
  "/login",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  login
);

router.post("/register", registerUser);

export default router;
