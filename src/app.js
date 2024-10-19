import express from "express";
import errorHandler from "./utils/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body

app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
