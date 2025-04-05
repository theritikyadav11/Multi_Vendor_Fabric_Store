import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import { updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Get user profile
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

router.put("/profile/update", updateUser);
router.delete("/profile/delete", deleteUser);

export default router;
