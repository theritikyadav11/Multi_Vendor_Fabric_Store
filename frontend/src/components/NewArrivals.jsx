import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFabrics } from "../redux/fabricSlice";
import { addToCartDB } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fabrics, loading } = useSelector((state) => state.fabric);
  const user = useSelector((state) => state.auth.user);
  const [addingToCart, setAddingToCart] = useState(null); // Track item being added

  useEffect(() => {
    dispatch(fetchFabrics());
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    console.log(`New Arrivals : ${user}`);
    if (!user) {
      toast.error("Please login first!");
      // navigate("/login");
      return;
    }

    try {
      const cartItem = {
        userId: user._id,
        items: [
          {
            fabric_id: product._id, // Ensure fabric_id matches backend schema
            price: product.price,
            quantity: 1, // Default quantity, adjust if needed
          },
        ],
      };

      setAddingToCart(product._id);
      await dispatch(addToCartDB(cartItem)).unwrap(); // Dispatch Redux action
      toast.success(`${product.name} added to cart!`);

      setTimeout(() => setAddingToCart(null), 2000);
    } catch (error) {
      console.error("Cart API Error:", error);
      toast.error("Failed to add item to cart!");
      setAddingToCart(null);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          New Arrivals
        </h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Slider {...settings}>
            {fabrics.slice(0, 5).map((fabric) => (
              <div key={fabric._id} className="p-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{fabric.name}</h3>
                    <button
                      onClick={() => handleAddToCart(fabric)}
                      className={`mt-3 bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center w-full hover:bg-blue-700
                        ${
                          addingToCart === fabric._id
                            ? "bg-green-600 hover:bg-green-700"
                            : ""
                        }
                      `}
                      disabled={addingToCart === fabric._id}
                    >
                      {addingToCart === fabric._id ? (
                        <span>Adding...</span>
                      ) : (
                        <>
                          <FaShoppingCart className="mr-2" /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
