import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";
// const router = express.Router();
const router = express.Router();
// const userController = require("../controllers/userController");

router.get("/", getUsers);
router.get("/create", createUser);

export default router;
