import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <Link to={`/vendor/fabric/${product._id}`}>
        {" "}
        {/* Link to product details page */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600">Rs. {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
