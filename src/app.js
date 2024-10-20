import express from "express";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import { allowedOrigins } from "./config/appConfigs.js";
const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
