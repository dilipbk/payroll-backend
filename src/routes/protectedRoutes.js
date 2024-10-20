import express from "express";
import { protect, authorize } from "../controllers/authController.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("1"), (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

export default router;
