import Order from "../models/Order.js";
import Fabric from "../models/Fabric.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice, paymentMethod, shippingAddress } =
      req.body;

    if (
      !userId ||
      !items ||
      items.length === 0 ||
      !totalPrice ||
      !paymentMethod ||
      !shippingAddress
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    if (Object.values(shippingAddress).some((value) => !value)) {
      return res
        .status(400)
        .json({ message: "Missing shipping address details." });
    }

    // Validate fabric IDs and check inventory (similar to before)
    let backendTotalPrice = 0;
    const orderItemsWithDetails = [];

    for (const item of items) {
      const fabric = await Fabric.findById(item.fabric_id);
      if (!fabric) {
        return res
          .status(400)
          .json({ message: `Fabric with ID ${item.fabric_id} not found.` });
      }
      if (fabric.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${fabric.name}. Available: ${fabric.stock}, Requested: ${item.quantity}`,
        });
      }

      backendTotalPrice += fabric.price * item.quantity;
      orderItemsWithDetails.push({
        fabric_id: item.fabric_id,
        quantity: item.quantity,
        price: fabric.price,
      });

      fabric.stock -= item.quantity;
      await fabric.save();
    }

    if (totalPrice !== backendTotalPrice) {
      return res
        .status(400)
        .json({ message: "Total price mismatch. Please review your cart." });
    }

    // Create the order, including shipping address
    const order = new Order({
      userId,
      items: orderItemsWithDetails,
      totalPrice: backendTotalPrice,
      paymentMethod,
      shippingAddress: shippingAddress,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder); // Respond with the created order, including the ID
  } catch (error) {
    console.error("Create Order Error:", error);
    res
      .status(500)
      .json({ message: "Could not create order.", error: error.message });
  }
};
