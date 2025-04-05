import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFabrics } from "../redux/fabricSlice";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { fabrics, loading, error } = useSelector((state) => state.fabric);

  useEffect(() => {
    dispatch(fetchFabrics());
  }, [dispatch]);

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          All Products
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fabrics.length > 0 ? (
              fabrics.map((fabric) => (
                <Link to={`/product/${fabric._id}`} key={fabric._id}>
                  <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition">
                    <img
                      src={fabric.image}
                      alt={fabric.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold">{fabric.name}</h3>
                      <p className="text-gray-600 font-semibold mt-2">
                        Rs. {fabric.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center col-span-full">No fabrics available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
