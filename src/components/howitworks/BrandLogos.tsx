import React, { useEffect, useRef } from "react";
import Acura from "../../assets/logos/Acura.png";
import GroupCircle from "../../assets/logos/GroupCircle.png";
import HONDA from "../../assets/logos/HONDA.png";
import Jaguar from "../../assets/logos/Jaguar.png";
import Nissan from "../../assets/logos/Nissan.png";
import VolvoCars from "../../assets/logos/VolvoCars svg.png";
import Audi from "../../assets/logos/GroupCircle.png"; // replace with real Audi logo

const brandImages = [HONDA, Jaguar, Nissan, VolvoCars, Audi, Acura];

export default function BrandLogos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (!container) return;
      scrollAmount += 1;
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 5);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden whitespace-nowrap gap-6 w-full"
    >
      {[...brandImages, ...brandImages].map((img, idx) => (
        <div key={idx} className="flex-shrink-0">
          <img src={img} alt="brand" className="h-6 w-auto" />
        </div>
      ))}
    </div>
  );
}
