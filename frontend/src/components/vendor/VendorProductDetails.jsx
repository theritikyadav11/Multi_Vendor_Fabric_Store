import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails, deleteProduct } from "../../services/api";
import { toast } from "react-toastify";

const VendorProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProductDetails(productId);
        setProduct(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [productId]);

  const handleUpdateClick = () => {
    navigate(`/vendor/product/edit/${productId}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      setError(null);
      deleteProduct(productId)
        .then(() => {
          toast.success("Product deleted successfully!");
          navigate("/vendor/products"); // Redirect to all products page
        })
        .catch((err) => {
          setError(err.message || "Failed to delete product.");
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-96 h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 px-4 ">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">Price: Rs. {product.price}</p>
        <p className="text-gray-700 mb-3">Total Quantity: {product.stock}</p>
        {product.description && (
          <p className="text-gray-700 mb-4">
            Description: {product.description}
          </p>
        )}

        {/* Update and Delete Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default VendorProductDetails;
