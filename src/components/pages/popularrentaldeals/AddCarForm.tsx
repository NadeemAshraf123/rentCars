import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../../../redux/slice/carslice/carSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCarForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    reviews: "",
    passengers: "",
    transmission: "Auto",
    ac: true,
    doors: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!user || user.role !== "owner") {
      toast.error("Access denied. Only owners can add cars.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = "Car name is required";
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.reviews) newErrors.reviews = "Reviews count is required";
    if (!formData.passengers) newErrors.passengers = "Passenger info is required";
    if (!formData.doors) newErrors.doors = "Door info is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(addCar(formData))
        .unwrap()
        .then(() => {
          toast.success("Car added successfully!");
          navigate("/");
        })
        .catch(() => {
          toast.error("Failed to add car. Try again.");
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-md rounded p-6 space-y-4 mt-10"
    >
      <h2 className="text-2xl font-bold text-center">Add Car Rental Deal</h2>

      <div>
        <label>Car Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Audi R8"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label>Rating</label>
        <input
          type="number"
          name="rating"
          placeholder="e.g. 4.8"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
      </div>

      <div>
        <label>Reviews Count</label>
        <input
          type="number"
          name="reviews"
          placeholder="e.g. 2436"
          value={formData.reviews}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.reviews && <p className="text-red-500 text-sm">{errors.reviews}</p>}
      </div>

      <div>
        <label>Passengers</label>
        <input
          type="text"
          name="passengers"
          placeholder="e.g. 4 Passengers"
          value={formData.passengers}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.passengers && <p className="text-red-500 text-sm">{errors.passengers}</p>}
      </div>

      <div>
        <label>Transmission</label>
        <select
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Auto">Auto</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ac"
            checked={formData.ac}
            onChange={handleChange}
          />
          Air Conditioning
        </label>
      </div>

      <div>
        <label>Doors</label>
        <input
          type="text"
          name="doors"
          placeholder="e.g. 4 Doors"
          value={formData.doors}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.doors && <p className="text-red-500 text-sm">{errors.doors}</p>}
      </div>

      <div>
        <label>Price per Day</label>
        <input
          type="number"
          name="price"
          placeholder="e.g. 1800"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <div>
        <label>Upload Car Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-full h-40 object-contain border rounded"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Car
      </button>
    </form>
  );
}
