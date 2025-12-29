import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, updateCar, deleteCar } from "../../redux/slice/carslice/carSlice";
import { toast } from "react-toastify";
import EditCarModal from "./EditCarModal";

export default function CarList() {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state: any) => state.cars);
  const { user } = useSelector((state: any) => state.auth);
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const ownerCars = cars.filter((car: any) => car.ownerId === user?.id);

  const handleDelete = (id: number) => {
    dispatch(deleteCar(id))
      .unwrap()
      .then(() => toast.success("Car deleted"))
      .catch(() => toast.error("Delete failed"));
  };

  const openEditModal = (car: any) => {
    setEditingCar(car);
  };

  const submitEdit = (carId: number, updatedData: any) => {
    dispatch(updateCar({ id: carId, data: updatedData }))
      .unwrap()
      .then(() => toast.success("Car updated"))
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading && <p>Loading cars...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {ownerCars.length === 0 && !loading && <p>No cars added yet.</p>}

      {ownerCars.map((car: any) => (
        <div key={car.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          <div className="space-y-1 text-sm text-gray-700">
            <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
            <p>⭐ {car.rating} ({car.reviewsCount} reviews)</p>
            <p>{car.passengers} Passengers</p>
            <p>{car.transmission}</p>
            <p>{car.airConditioning ? "Air Conditioning" : "No AC"}</p>
            <p>{car.doors} Doors</p>
            <p className="text-lg font-semibold text-blue-600">${car.price}/day</p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => openEditModal(car)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              title="Edit this car"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(car.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              title="Delete this car"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editingCar && (
        <EditCarModal
          car={editingCar}
          onClose={() => setEditingCar(null)}
          onSubmit={submitEdit}
        />
      )}
    </div>
  );
}
