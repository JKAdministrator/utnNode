import { Router } from "express";
import mongoose from "mongoose";
export const router = Router();
router.get("/", (req, res) => {
  let dbStatus = "disconnected";

  try {
    if (mongoose.connection.readyState === 1) dbStatus = "connected";
  } catch (e) {}
  try {
    if (dbStatus == "disconnected") throw new Error("Database unavailable");
    res.status(200).json({
      success: true,
      message: `ok`,
      dbStatus: dbStatus,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: `${e.message}`,
      dbStatus: dbStatus,
    });
  }
});
