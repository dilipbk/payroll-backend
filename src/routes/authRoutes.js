import express from "express";
import authController from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

// Login route
router.post(
  "/login",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  authController.login
);

router.post("/register", authController.registerUser);

export default router;
