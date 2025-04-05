import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addFabric,
  getAllFabrics,
  getFabricById,
  updateFabric,
  deleteFabric,
  getVendorFabrics,
  getVendorFabricById,
} from "../controllers/fabricController.js";
// import { addProduct } from "../../../frontend/src/services/api.js";

const router = express.Router();

//customer routes
router.route("/").get(getAllFabrics).post(protect, addFabric);
router
  .route("/:id")
  .get(getFabricById)
  .put(protect, updateFabric)
  .delete(protect, deleteFabric);

//vendor routes
router.get("/vendor/fabrics", protect, getVendorFabrics);
router.get("/vendor/fabrics/:id", protect, getVendorFabricById);
router.put("/vendor/fabrics/:id", protect, updateFabric);
router.delete("/vendor/fabrics/:id", protect, deleteFabric);
router.post("/vendor/fabrics", protect, addFabric);

export default router;
