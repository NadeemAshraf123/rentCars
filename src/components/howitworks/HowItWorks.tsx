import React from 'react'
import StepCard from './StepCard'
import { FaMapMarkedAlt, FaCalendarAlt, FaCar } from 'react-icons/fa'
import BrandLogos from './BrandLogos'

export default function HowItWorks() {
  return (
    <>
    <section className="py-12 px-60  bg-white">
      <div className="text-center mb-8">
        <button className="text-blue-400 p-4 bg-[#ECF5FF] font-semibold text-sm mb-2 rounded-md">HOW IT WORK</button>
        <h2 className="text-4xl font-md text-gray-900 mt-5 mb-18">Rent with following 3 working steps</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mb-12">
        <StepCard
          icon={<FaMapMarkedAlt />}
          title="Choose location"
          description="Choose your and find your best car"
        />
        <StepCard
          icon={<FaCalendarAlt />}
          title="Pick-up date"
          description="Select your pick up date and time to book your car"
        />
        <StepCard
          icon={<FaCar />}
          title="Book your car"
          description="Book your car and we will deliver it directly to you"
        />
      </div>

    </section>
      <BrandLogos />
    </>
  )
}
