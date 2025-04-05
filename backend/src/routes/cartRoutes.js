import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart); // Fetch cart
router.post("/", addToCart); // Add to cart
router.delete("/clear", clearCart); // Clear cart
router.put("/:fabricId", updateCartItem); // Update quantity
router.delete("/:id", removeFromCart); // Remove item

export default router;
