import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import AppWhiteIcon from "../../../assets/icons/AppWhiteIcon.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#071d34] to-[#041423] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2 text-white text-xl font-semibold">
              <img src={AppWhiteIcon} alt="Rentcars Logo" className="w-8 h-8 object-contain" />
              RENTCARS
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} />
                <p>25566 Hc 1, Glenallen,<br />Alaska, 99588, USA</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <p>+603 4784 273 12</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <p>rentcars@gmail.com</p>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-5">Our Product</h3>
            <ul className="space-y-3 text-sm">
              {["Career", "Car", "Packages", "Features", "Priceline"].map(
                (item) => (
                  <li key={item} className="hover:text-white cursor-pointer">
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-5">Resources</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Download",
                "Help Centre",
                "Guides",
                "Partner Network",
                "Cruises",
                "Developer",
              ].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-5">About Rentcars</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Why choose us",
                "Our Story",
                "Investor Relations",
                "Press Center",
                "Advertise",
              ].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

    
          <div>
            <h3 className="text-white font-semibold mb-5">Follow Us</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:border-white cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:border-white cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:border-white cursor-pointer">
                <Youtube size={18} />
              </div>
            </div>
          </div>
        </div>

    
        <div className="border-t border-gray-600 mt-16 pt-6">
          <p className="text-sm text-gray-400">
            Copyright 2023 · Rentcars, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
