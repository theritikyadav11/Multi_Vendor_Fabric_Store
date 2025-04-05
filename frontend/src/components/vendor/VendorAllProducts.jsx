import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchVendorProducts } from "../../services/api";
import ProductCard from "../../components/vendor/ProductCard";

const VendorAllProducts = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVendorProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchVendorProducts(user.id);
        setProducts(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "vendor") {
      getVendorProducts();
    }
  }, [user]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>You haven't added any products yet.</p>
      )}
    </div>
  );
};

export default VendorAllProducts;
