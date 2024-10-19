// src/routes/userRoutes.js
import express from "express";
// const router = express.Router();
import { Router } from "express";
// const userController = require("../controllers/userController");

// Define routes
Router.get("welcome", async (req, res) => {
  res.status(200).json({ message: "Success" });
});

export default Router;
