import React from 'react'
import FeatureCard from './FeatureCard'
import Audi1 from '../../assets/images/Audi1.png'
import carbg1 from '../../assets/icons/carbg1.png'

import { FaCheckCircle, FaUserTie, FaTruck, FaHeadset } from 'react-icons/fa'

export default function WhyChooseUs() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 bg-white mt-30">
    <div className="flex-1 relative flex items-center justify-center mt-12">
  
  <img
    src={Audi1}
    alt="Background shape"
    className="absolute w-[500px] h-[500px] object-contain z-0"
  />

  
  <img
    src={carbg1}
    alt="Audi R8"
    className="relative z-10 w-[420px] h-auto object-contain"
  />
</div>

      <div className="flex-1">
        <h3 className="text-blue-500 bg-[#ECF5FF] px-6 py-3 rounded-xl text-sm mb-4 inline-block">WHY CHOOSE US</h3>
        <h2 className="text-5xl pr-40 text-gray-800 mb-6">
          We offer the best experience with our rental deals
        </h2>

        <FeatureCard icon={<FaCheckCircle />} title="Best price guaranteed" description="Find a lower price? We’ll refund you 100% of the difference." /> 
        <FeatureCard icon={<FaUserTie />} title="Experienced driver" description="Don’t have a driver? Don’t worry, we have many experienced drivers for you." /> 
        <FeatureCard icon={<FaTruck />} title="24 hour car delivery" description="Book your car anytime and we will deliver it directly to you." /> 
        <FeatureCard icon={<FaHeadset />} title="24/7 technical support" description="Have a question? Contact Rentcars support any time when you have a problem." />
      </div>
    </section>
  )
}
