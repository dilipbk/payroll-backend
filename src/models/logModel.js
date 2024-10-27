import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
  method: String,
  url: String,
  status: Number,
  responseTime: Number,
  ip: String,
  date: { type: Date, default: Date.now },
});

const RequestLog = mongoose.model("Log", requestLogSchema);

export default RequestLog;
