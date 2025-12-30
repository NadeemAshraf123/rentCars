import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { addFeedback } from "../../../redux/slice/feedbackSlice/feedbackSlice";
import { toast } from "react-toastify";

export default function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const { carId, bookingId } = location.state || {};

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    comment: "",
    image: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs: any = {};
    if (!formData.name) errs.name = "Name is required";
    if (!formData.address) errs.address = "Address is required";
    if (!formData.comment) errs.comment = "Comment is required";
    if (rating === 0) errs.rating = "Rating is required";
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

    const feedbackPayload = {
      id: `feedback-${Date.now()}`,
      userId: user.id,
      bookingId,
      carId,
      name: formData.name,
      address: formData.address,
      rating,
      comment: formData.comment,
      image: formData.image,
      createdAt: new Date().toISOString(),
    };

    try {
      await dispatch(addFeedback(feedbackPayload)).unwrap();
      toast.success("Feedback submitted successfully!");
      navigate("/"); // or navigate("/mybookings") if you want
    } catch {
      toast.error("Failed to submit feedback. Try again.");
    }
  };

  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-3xl font-bold mb-6">Share your feedback</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Rating stars */}
        <div>
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer ${
                  (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
            <span className="ml-2 text-lg font-semibold text-gray-700">
              {rating > 0 ? rating.toFixed(1) : "0.0"}
            </span>
          </div>
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-gray-700">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
          />
          {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#1572D3] text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
