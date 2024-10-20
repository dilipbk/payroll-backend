import express from "express";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "https://payroll-backend-8faq.onrender.com", // Replace with your frontend domain
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
