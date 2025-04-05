import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartDB } from "../redux/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.fabric.fabrics);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const selectedProduct = products.find((item) => item._id === id);
      setProduct(selectedProduct);
    }
  }, [id, products]);

  if (!product) {
    return <p className="text-center py-10">Product not found.</p>;
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    try {
      const cartItem = {
        userId: user._id,
        items: [
          {
            fabric_id: product._id, // Ensure fabric_id matches backend schema
            price: product.price,
            quantity,
          },
        ],
      };

      setButtonState(true);
      await dispatch(addToCartDB(cartItem)).unwrap(); // Dispatch Redux action
      toast.success("Item added to cart!");

      setTimeout(() => setButtonState(false), 2000);
    } catch (error) {
      console.error("Cart API Error:", error);
      toast.error("Failed to add item to cart!");
      setButtonState(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-96 h-auto rounded-lg shadow-md"
        />
      </div>

      <div className="w-full md:w-1/2 px-6">
        <h2 className="text-3xl font-semibold">{product.name}</h2>
        <p className="text-2xl text-gray-800 font-bold mt-2">
          Rs. {product.price}
        </p>
        <p className="text-gray-600 mt-4">{product.description}</p>

        {/* Quantity Selector */}
        <div className="mt-6 flex items-center space-x-4">
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className={`mt-6 px-6 py-2 rounded-lg ${
            buttonState ? "bg-green-500" : "bg-red-500 hover:bg-red-600"
          } text-white`}
          onClick={handleAddToCart}
          disabled={buttonState}
        >
          {buttonState ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
