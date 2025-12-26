import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import TopLeftIcon from "../../../assets/icons/TopLeftIcon.png";
import TopRightIcon from "../../../assets/icons/TopRightIcon.png";

import user1 from "../../../assets/images/user1.png";
import user2 from "../../../assets/images/user2.png";

const testimonials = [
  {
    name: "James Wilson",
    location: "New York, US",
    rating: 5,
    text: "I have been using your services for months. Your service is great, I will continue to use your service.",
    image: user1,
  },
  {
    name: "Charlie Johnson",
    location: "New York, US",
    rating: 5,
    text: "I feel very secure when using caretall’s services. Your customer care team is very enthusiastic and the driver is always on time.",
    image: user2,
  },
  {
    name: "Sophia Martinez",
    location: "Los Angeles, US",
    rating: 4,
    text: "The booking process was smooth and the car was in excellent condition. Highly recommend!",
    image: user2,
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-[F7FBFF] py-50 px-4 md:px-20">
      
      <img
        src={TopLeftIcon}
        alt="decorative left"
        className="absolute top-4 left-4 w-10 h-10"
      />
      <img
        src={TopRightIcon}
        alt="decorative right"
        className="absolute top-4 right-4 w-10 h-10"
      />

    
      <div className="text-center mb-12">
        <h3 className="text-blue-500 text-sm font-medium mb-2">TESTIMONIALS</h3>
        <h2 className="text-3xl md:text-5xl font-bold">
          What people say about us?
        </h2>
      </div>

      
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {testimonials.map((review, index) => (
         <SwiperSlide key={index}>
  <div className="bg-white rounded-xl shadow-md border border-gray-100 w-full max-w-[700px] mx-auto h-[300px] flex overflow-hidden">
   
    <div className="w-1/2 h-full flex items-center justify-center bg-gray-50">
      <img
        src={review.image}
        alt={review.name}
        className="w-[100%] h-[100%] object-cover rounded-xl"
      />
    </div>

    
    <div className="w-1/2 h-full p-6 flex flex-col justify-center">
   
      <span className="text-sm font-semibold text-gray-700 mb-1">
        {review.rating.toFixed(1)}
      </span>
      <div className="flex text-yellow-500 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

    
      <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-4">
        {review.text}
      </p>

      
      <h4 className="font-semibold text-base">{review.name}</h4>
      <span className="text-xs text-gray-500">From {review.location}</span>
    </div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>
    </section>
  );
}
