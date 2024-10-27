import Log from "../models/logModel.js"; // Import the RequestLog model

const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const responseTime = Date.now() - start;
    const log = new Log({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime,
      ip: req.ip,
    });

    try {
      await log.save();
    } catch (err) {
      console.error("Error logging request", err);
    }
  });

  next();
};

export default logger;
