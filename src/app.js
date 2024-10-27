import express from "express";
import errorHandler from "./utils/errorHandler.js";
import cors from "cors";
import { allowedOrigins } from "./config/appConfigs.js";
import allRoutes from "./routes/index.js";
import { limiter as rateLimitter } from "./utils/rateLimitter.js";
import helmet from "helmet";
// import csrf from "csurf";
import sessionMiddleware from "./middlewares/setSession.js";
import notFoundHandler from "./middlewares/notFound.js";
import morgan from "morgan";
import logger from "./middlewares/logRequest.js";
import authRoutes from "./routes/authRoutes.js";
import { authorize } from "./middlewares/authorize.js";
import authenticate from "./middlewares/authenticate.js";

// const csrfProtection = csrf({ cookie: true });
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
// app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(rateLimitter);
app.use(helmet());
// app.use(csrfProtection);

app.use(sessionMiddleware);

app.use(logger);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users/:id", authenticate, authorize, allRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
