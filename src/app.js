import express from "express";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

// Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
