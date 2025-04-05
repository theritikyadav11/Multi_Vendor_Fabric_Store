import express from "express";
import { createOrder } from "../controllers/checkoutController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new order, protected by authentication
router.route("/").post(protect, createOrder);

export default router;
