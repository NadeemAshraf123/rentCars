import React, { useEffect, useState } from "react";
import { FaUser, FaCogs, FaSnowflake, FaDoorClosed, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../../redux/slice/carslice/carSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PopularRentalDeals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cars, loading, error } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.auth);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const visibleCars = showAll ? cars : cars.slice(0, 4);

  const handleRentClick = () => {
    if (!user) {
      toast.error("Please login or register first");
      navigate("/login");
    } else {
      toast.success("Booking flow coming soon!");
    }
  };

  return (
    <section className="bg-white mt-30 px-4 md:px-20">
      <div className="flex flex-col items-center text-left mb-10">
        <h3 className="text-blue-500 bg-[#ECF5FF] px-6 py-3 rounded-xl text-sm mb-4 inline-block">
          POPULAR RENTAL DEALS
        </h3>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Most popular cars rental deals
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading cars...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading cars: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleCars.map((car, index) => (
            <div key={index} className="rounded-xl shadow-lg overflow-hidden bg-white w-full min-h-[400px] px-6 flex flex-col items-center text-center">
              <img src={car.image} alt={car.name} className="w-full h-40 object-contain" />

              <div className="px-6 py-4 w-full">
                <h4 className="text-lg text-left font-semibold mb-2">{car.name}</h4>
                <p className="text-sm text-gray-600 mb-4 text-left">
                  ⭐ {car.rating} ({parseInt(car.reviews).toLocaleString()} reviews)
                </p>

                <ul className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs text-gray-400 mb-4">
                  <li className="flex items-center gap-2 whitespace-nowrap">
                    <FaUser className="text-lg flex-shrink-0" /> {car.passengers}
                  </li>
                  <li className="flex items-center gap-2 whitespace-nowrap">
                    <FaCogs className="text-lg flex-shrink-0" /> {car.transmission}
                  </li>
                  <li className="flex items-center gap-2 whitespace-nowrap">
                    <FaSnowflake className="text-lg flex-shrink-0" /> {car.ac ? "Air Conditioning" : "No AC"}
                  </li>
                  <li className="flex items-center gap-2 whitespace-nowrap">
                    <FaDoorClosed className="text-lg flex-shrink-0" /> {car.doors}
                  </li>
                </ul>

                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <span className="font-medium text-gray-400">Price</span>
                  <span className="text-xl font-bold text-gray-600">
                    ${car.price} <span className="text-gray-400 text-xs"> /day </span>
                  </span>
                </div>

                <div className="flex justify-center rounded-4xl">
                  <button
                    onClick={handleRentClick}
                    className="flex items-center justify-center gap-2 w-full bg-[#1572D3] text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Rent Now <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-30">
        {!showAll && cars.length > 4 && (
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 bg-[#ECF5FF] text-blue-500 px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-100 transition"
          >
            Show all vehicles <FaArrowRight />
          </button>
        )}
      </div>
    </section>
  );
}
