import Cart from "../models/Cart.js";

// Add item to cart (create if not exists)
export const addToCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid request. Missing required fields." });
    }

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({ userId: userId, items: [], totalPrice: 0 });
    }

    items.forEach(({ fabric_id, quantity, price }) => {
      const existingItem = cart.items.find(
        (item) => item.fabric_id.toString() === fabric_id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ fabric_id, quantity, price });
      }
    });

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Cart Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart (handle empty cart response)
export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required", items: [] });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.fabric_id",
      model: "Fabric",
    });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Transform the data to match frontend expectations
    const transformedItems = cart.items.map((item) => ({
      _id: item._id,
      product: {
        _id: item.fabric_id?._id,
        name: item.fabric_id?.name,
        price: item.price || item.fabric_id?.price,
        image: item.fabric_id?.image,
      },
      quantity: item.quantity,
    }));

    res.status(200).json({ items: transformedItems });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: error.message, items: [] });
  }
};

// Remove item from cart (delete cart if empty)
export const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(`userId backend: ${userId}`);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !item.fabric_id.equals(req.params.id)
    );

    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Cart is now empty" });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item quantity in the cart
export const updateCartItem = async (req, res) => {
  try {
    const { userId, fabricId, quantity } = req.body;

    if (!userId || !fabricId || quantity === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.fabric_id.equals(fabricId));
    console.log("Found item in cart:", item);
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear the entire cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    await Cart.findByIdAndDelete(cart._id);
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
