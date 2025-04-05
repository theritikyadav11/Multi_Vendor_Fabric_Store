import Fabric from "../models/Fabric.js";

// Add a new fabric (Vendor Only)
export const addFabric = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Only vendors can add fabrics" });
    }

    const { name, description, price, stock, category, image } = req.body;
    const fabric = new Fabric({
      name,
      description,
      price,
      stock,
      category,
      image,
      vendor_id: req.user._id,
    });

    await fabric.save();
    res.status(201).json(fabric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fabrics
export const getAllFabrics = async (req, res) => {
  try {
    const fabrics = await Fabric.find();
    res.json(fabrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single fabric
export const getFabricById = async (req, res) => {
  try {
    const fabric = await Fabric.findById(req.params.id);
    if (!fabric) return res.status(404).json({ message: "Fabric not found" });
    res.json(fabric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update fabric (Vendor Only)
export const updateFabric = async (req, res) => {
  try {
    const fabricId = req.params.id;
    const { name, price, description, stock, image } = req.body;

    const fabric = await Fabric.findById(fabricId);

    if (fabric) {
      if (fabric.vendor_id.toString() === req.user.id) {
        fabric.name = name || fabric.name;
        fabric.price = price || fabric.price;
        fabric.description = description || fabric.description;
        fabric.stock = stock || fabric.stock;
        fabric.image = image || fabric.image;

        const updatedFabric = await fabric.save();
        res.json(updatedFabric);
      } else {
        res
          .status(403)
          .json({ message: "Not authorized to update this product." });
      }
    } else {
      res.status(404).json({ message: "Fabric not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the fabric." });
  }
};

// Delete fabric (Vendor Only)
export const deleteFabric = async (req, res) => {
  try {
    const fabricId = req.params.id;

    const fabric = await Fabric.findById(fabricId);

    if (fabric) {
      if (fabric.vendor_id.toString() === req.user.id) {
        await fabric.deleteOne();
        res.json({ message: "Fabric removed" });
      } else {
        res
          .status(403)
          .json({ message: "Not authorized to delete this product." });
      }
    } else {
      res.status(404).json({ message: "Fabric not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the fabric." });
  }
};

//Get Vendor all Fabrics
export const getVendorFabrics = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const fabrics = await Fabric.find({ vendor_id: vendorId });
    res.json(fabrics);
  } catch (error) {
    console.error("Error fetching vendor fabrics:", error);
    res.status(500).json({ message: "Failed to fetch fabrics." });
  }
};

//Get vendor fabric by id
export const getVendorFabricById = async (req, res) => {
  try {
    const fabric = await Fabric.findById(req.params.id);

    if (fabric) {
      res.json(fabric);
    } else {
      res.status(404).json({ message: "Fabric not found" });
    }
  } catch (error) {
    console.error("Error fetching fabric by ID:", error);
    res.status(500).json({ message: "Failed to fetch fabric." });
  }
};
