import React, { useState, useEffect } from "react";

export default function EditCarModal({ car, onClose, onSubmit }) {
  const [formData, setFormData] = useState(car);
  const [preview, setPreview] = useState(car.image);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(car);
    setPreview(car.image);
  }, [car]);

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

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = "Car name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.image) newErrors.image = "Image is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(car.id, formData);
    onClose();
  };

  return (
    // ✅ Outer overlay with scroll enabled
    <div className="fixed inset-0 bg-white bg-opacity-20 z-50 overflow-y-auto">
      {/* ✅ Flex wrapper for horizontal centering + vertical padding */}
      <div className="flex justify-center py-10">
        {/* ✅ Actual modal box */}
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Car Details</h2>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-500 hover:text-red-500 text-2xl"
          >
            ✕
          </button>

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-cover rounded-md mb-6 border"
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Car Name */}
            <div>
              <label className="block font-medium text-gray-700">Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium text-gray-700">Price per Day</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            {/* Rating */}
            <div>
              <label className="block font-medium text-gray-700">Rating</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Reviews Count */}
            <div>
              <label className="block font-medium text-gray-700">Reviews Count</label>
              <input
                type="number"
                name="reviewsCount"
                value={formData.reviewsCount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Passengers */}
            <div>
              <label className="block font-medium text-gray-700">Passengers</label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Transmission */}
            <div>
              <label className="block font-medium text-gray-700">Transmission</label>
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

            {/* Air Conditioning */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="airConditioning"
                checked={formData.airConditioning}
                onChange={handleChange}
              />
              <label className="text-gray-700">Air Conditioning</label>
            </div>

            {/* Doors */}
            <div>
              <label className="block font-medium text-gray-700">Doors</label>
              <input
                type="number"
                name="doors"
                value={formData.doors}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium text-gray-700">Upload New Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
