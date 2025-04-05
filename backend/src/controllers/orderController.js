import Order from "../models/Order.js";
import Fabric from "../models/Fabric.js";

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("userId", "name email") // Use 'userId' here
    .populate({
      path: "items.fabric_id",
      select: "name price image",
    });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, paymentMethod } = req.body;
    // Check stock before placing an order
    for (let item of items) {
      const fabric = await Fabric.findById(item.fabric_id);
      if (!fabric) {
        return res.status(404).json({ message: "Fabric not found" });
      }
      if (fabric.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${fabric.name}` });
      }
      // Reduce stock
      fabric.stock -= item.quantity;
      await fabric.save();
    }
    const order = new Order({
      customer_id: req.user._id,
      items,
      totalPrice,
      paymentMethod,
      status: "pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vendorOrders (Vendor Only)
export const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user.id;

    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.fabric_id", "name vendor_id");

    const vendorOrders = orders.filter((order) =>
      order.items.some(
        (item) => item.fabric_id.vendor_id.toString() === vendorId
      )
    );
    res.json(vendorOrders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching vendor orders" });
  }
};

//Delete order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate({
      path: "items",
      populate: {
        path: "fabric_id",
        select: "vendor_id",
      },
    });

    let belongsToVendor = false;
    if (order.items && order.items.length > 0) {
      belongsToVendor = order.items.some((item) => {
        return (
          item.fabric_id &&
          item.fabric_id.vendor_id &&
          item.fabric_id.vendor_id.toString() === req.user.id
        );
      });
    }

    if (belongsToVendor) {
      await order.deleteOne();
      res.json({ message: "Order removed" });
    } else {
      res.status(403).json({ message: "Not authorized to delete this order." });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the order" });
  }
};
