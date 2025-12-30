import React, { useState, useEffect } from "react";

export default function EditCarModal({ car, onClose, onSubmit }) {
  const [formData, setFormData] = useState(car);
  const [preview, setPreview] = useState(car.image);
  const [errors, setErrors] = useState({});

useEffect(() => {
  setFormData({
    ...car,
    passengers: parseInt(car.passengers), 
    doors: parseInt(car.doors),        
    reviews: car.reviews ?? 0,
  });
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

  const formattedData = {
    ...formData,
    passengers: `${formData.passengers}-passengers`,
    doors: `${formData.doors}-Doors`,
  };

  onSubmit(car.id, formattedData);
  onClose();
};

  return (
    
    <div className="absolute inset-0 bg-[#f9fafb] bg-opacity-0 backdrop-blur-sm  overflow-y-auto">
      <div className="flex justify-center py-10">
       
        <div className="bg-gray-400 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Car Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-6 font-bold cursor-pointer text-gray-500 hover:text-red-500 text-2xl"
          >
            ✕
          </button>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-cover rounded-lg shadow-lg mb-6 border-none"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-600">Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl "
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Price per Day</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Rating</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Reviews Count</label>
              <input
                type="number"
                name="reviewsCount"
                value={formData.reviews}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Passengers</label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl"
              >
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="airConditioning"
                checked={formData.airConditioning}
                onChange={handleChange}
              />
              <label className="text-gray-700">Air Conditioning</label>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Doors</label>
              <input
                type="number"
                name="doors"
                value={formData.doors}
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Upload New Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-2 rounded text-gray-400 border-none shadow-xs bg-gray-100 rounded-xl"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl cursor-pointer hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600"
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
