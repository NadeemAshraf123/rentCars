// components/dashboard/BookingCars.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../redux/slice/bookingslice/bookingSlice";
import { toast } from "react-toastify";

export default function BookingCars() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const car = location.state?.car;

  const [formData, setFormData] = useState({
    pickupDate: "",
    dropoffDate: "",
    location: "",
    notes: "",
  });
  const [errors, setErrors] = useState<any>({});

  if (!car) {
    return (
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <p className="text-red-500">No car selected. Please go back and choose a car.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs: any = {};
    if (!formData.pickupDate) errs.pickupDate = "Pick-up date is required";
    if (!formData.dropoffDate) errs.dropoffDate = "Drop-off date is required";
    if (!formData.location) errs.location = "Location is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const bookingPayload = {
      id: `${car.id}-${Date.now()}`, // simple unique id
      userId: user.id,
      carId: car.id,
      carName: car.name,
      pricePerDay: Number(car.price),
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate,
      location: formData.location,
      notes: formData.notes,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await dispatch(addBooking(bookingPayload)).unwrap();
      toast.success("Booking placed successfully!");
      navigate("/feedback", { state: { carId: car.id, bookingId: bookingPayload.id } });
    } catch {
      toast.error("Failed to place booking. Try again.");
    }
  };

  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-3xl font-bold mb-6">Booking details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <img src={car.image} alt={car.name} className="w-full h-56 object-cover rounded-md mb-6" />
          <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
          <p className="text-gray-600 mb-4">⭐ {car.rating} ({Number(car.reviews).toLocaleString()} reviews)</p>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 mb-6">
            <li>{car.passengers}</li>
            <li>{car.transmission}</li>
            <li>{car.ac === true || car.ac === "true" ? "Air Conditioning" : "No AC"}</li>
            <li>{car.doors}</li>
          </ul>

          <p className="text-lg font-bold text-blue-600">${car.price}/day</p>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Enter booking details</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Pick-up date</label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Drop-off date</label>
              <input
                type="date"
                name="dropoffDate"
                value={formData.dropoffDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.dropoffDate && <p className="text-red-500 text-sm">{errors.dropoffDate}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter pickup location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Notes (optional)</label>
              <textarea
                name="notes"
                placeholder="Any special instructions"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border p-2 rounded h-24"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1572D3] text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Confirm booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
