import React, { useState } from "react";
import AddCarForm from "../pages/popularrentaldeals/AddCarForm";
import CarList from "./CarList";


export default function Dashboard() {
  const [view, setView] = useState("addCar");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">Owner Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => setView("addCar")} className="hover:bg-gray-700 p-2 rounded">
            ➕ Add Car
          </button>
          <button onClick={() => setView("myCars")} className="hover:bg-gray-700 p-2 rounded">
            🚗 My Cars
          </button>
          <button onClick={() => setView("bookings")} className="hover:bg-gray-700 p-2 rounded">
            📑 Bookings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {view === "addCar" && <AddCarForm />}
        {view === "myCars" && <CarList /> }
        {view === "bookings" && <p>Bookings list will show here...</p>}
      </main>
    </div>
  );
}
