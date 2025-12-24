import React from 'react'
import car1 from '../../../assets/images/car1.png'
import image2 from '../../../assets/icons/image 2.png';
import image3 from '../../../assets/icons/image 3.png';

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-12 bg-white">
    
      <div className="max-w-sm mt-0 mb-60">
        <h1 className="text-[48px] font-bold text-gray-800 mb-4">
          Find, book and rent a car Easily
        </h1>
        <p className="text-[20px] ">
          Get a car wherever and whenever you need it with your IOS and Android device.
        </p>
        <div className="flex gap-4 mt-5 ">
          <img src={image2} alt="Google Play" className="h-10" />
          <img src={image3} alt="App Store" className="h-10" />
        </div>
      </div>

      <div className="mt-30">
        <img src={car1} alt="Porsche car" className="w-[1047px] h-[700px]" />
      </div>

    </section>
  )
}
