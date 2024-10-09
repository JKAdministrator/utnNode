import { Router } from "express";
import { authController } from "../controllers/auth.js";
export const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
