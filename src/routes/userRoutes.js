import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Permission routes
router.get("/", userController.getUsers); // Get all permissions
router.get("/:id", userController.getUser); // Get permission by ID
router.post("/", userController.createUser); // Create a new permission
router.patch("/:id", userController.updateUser); // Update a permission
router.delete("/:id", userController.deleteUser); // Delete a permission

export default router;
