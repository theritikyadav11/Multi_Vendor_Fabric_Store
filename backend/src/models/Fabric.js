import mongoose from "mongoose";

const fabricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Fabric = mongoose.model("Fabric", fabricSchema);
export default Fabric;
