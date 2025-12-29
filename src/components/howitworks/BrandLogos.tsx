import React from "react";
import Acura from "../../assets/logos/Acura.png";
import HONDA from "../../assets/logos/HONDA.png";
import Jaguar from "../../assets/logos/Jaguar.png";
import Nissan from "../../assets/logos/Nissan.png";
import VolvoCars from "../../assets/logos/VolvoCars svg.png";
import Audi from "../../assets/logos/GroupCircle.png";

const brandImages = [HONDA, Jaguar, Nissan, VolvoCars, Audi, Acura];

export default function BrandLogos() {
  return (
    <div className="w-full py-6">
  <div className="flex items-center justify-between">
    {brandImages.map((img, idx) => (
      <div
        key={idx}
        className="w-[320px] h-[40px] flex items-center justify-center"
      >
        <img
          src={img}
          alt="brand"
          className="max-h-[38px] max-w-full object-contain  opacity-100"
        />
      </div>
    ))}
  </div>
</div>

  );
}
