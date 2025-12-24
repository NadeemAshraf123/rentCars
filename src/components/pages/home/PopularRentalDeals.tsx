import React, { useState } from 'react';
import { FaUser, FaCogs, FaSnowflake, FaDoorClosed, FaArrowRight } from "react-icons/fa";
import AudiR8 from '../../../assets/images/AudiR8.png';
import BMWM3 from '../../../assets/images/BMWM3.png';
import jaguarXLE from '../../../assets/images/jaguarXLE.png';
import Lambergini from '../../../assets/images/Lambergini.png';


const cars = [
  {
    name: "Jaguar XE L P250",
    rating: 4.8,
    reviews: 2436,
    passengers: 4,
    transmission: "Auto",
    ac: true,
    doors: 4,
    price: 1800,
    image: AudiR8,
  },
  {
    name: "Audi R8",
    rating: 4.6,
    reviews: 1936,
    passengers: 2,
    transmission: "Auto",
    ac: true,
    doors: 2,
    price: 2100,
    image: BMWM3,
  },
  {
    name: "BMW M3",
    rating: 4.5,
    reviews: 2036,
    passengers: 4,
    transmission: "Auto",
    ac: true,
    doors: 4,
    price: 1600,
    image: jaguarXLE,
  },
  {
    name: "Lamborghini Huracan",
    rating: 4.3,
    reviews: 2236,
    passengers: 2,
    transmission: "Auto",
    ac: true,
    doors: 2,
    price: 2300,
    image: Lambergini,
  },
  {
    name: "Mercedes AMG GT",
    rating: 4.7,
    reviews: 1836,
    passengers: 2,
    transmission: "Auto",
    ac: true,
    doors: 2,
    price: 2200,
    image: Lambergini,
  },
  {
    name: "Porsche 911",
    rating: 4.6,
    reviews: 2136,
    passengers: 2,
    transmission: "Auto",
    ac: true,
    doors: 2,
    price: 2000,
    image: jaguarXLE,
  },
  {
    name: "Tesla Model S",
    rating: 4.9,
    reviews: 2536,
    passengers: 5,
    transmission: "Auto",
    ac: true,
    doors: 4,
    price: 1900,
    image: BMWM3,
  },
  {
    name: "Chevrolet Corvette",
    rating: 4.4,
    reviews: 1736,
    passengers: 2,
    transmission: "Auto",
    ac: true,
    doors: 2,
    price: 1950,
    image: BMWM3,
  },
];


export default function PopularRentalDeals() {
  const [showAll, setShowAll] = useState(false);
  const visibleCars = showAll ? cars : cars.slice(0, 4);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleCars.map((car, index) => (
          <div key={index} className="rounded-xl shadow-lg overflow-hidden bg-white w-full min-h-[400px] px-6 flex flex-col items-center text-center">
          
            <img src={car.image} alt={car.name} className="w-full h-40 object-contain" />

           
            <div className="px-6 py-4 w-full">
              <h4 className="text-lg text-left font-semibold mb-2">{car.name}</h4>
              <p className="text-sm text-gray-600 mb-4 text-left">
                ⭐ {car.rating} ({car.reviews.toLocaleString()} reviews)
              </p>

             
              <ul className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs text-gray-400 mb-4">
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <FaUser className="text-lg flex-shrink-0" /> {car.passengers} Passengers
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <FaCogs className="text-lg flex-shrink-0" /> {car.transmission}
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <FaSnowflake className="text-lg flex-shrink-0" /> {car.ac ? "Air Conditioning" : "No AC"}
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <FaDoorClosed className="text-lg flex-shrink-0" /> {car.doors} Doors
                </li>
              </ul>

             
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600"> 
                <span className="font-medium text-gray-400">Price</span>
                <span className="text-xl font-bold text-gray-600">${car.price} <span className='text-gray-400 text-xs'> /day </span></span>
              </div>

             
              <div className="flex justify-center rounded-4xl">
                <button className="flex items-center justify-center gap-2 w-full bg-[#1572D3] text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                  Rent Now <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-30">
        {!showAll && (
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

