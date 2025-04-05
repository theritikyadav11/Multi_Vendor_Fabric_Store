import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  placeOrder,
  getOrderById,
  getVendorOrders,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, placeOrder).get(protect, getVendorOrders);
router.route("/:id").get(protect, getOrderById);

// Vendor routes
router.get("/vendor/orders", protect, getVendorOrders);
router.delete("/vendor/orders/:id", protect, deleteOrder);

export default router;
