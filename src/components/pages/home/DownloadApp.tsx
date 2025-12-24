
import  downloadAppbg from "../../../assets/icons/downloadAppbg.png";
import downloadMbl from "../../../assets/images/downloadMbl.png";
import downloadAppCar from "../../../assets/images/downloadAppCar.png";
import googlePlay from "../../../assets/icons/GooglePlay.png";
import AppStore from "../../../assets/icons/AppStore.png";

const DownloadApp = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 py-18 grid grid-cols-1 lg:grid-cols-2 items-center">
        
        <div className="relative z-10">
          
          <img
            src={downloadAppbg}
            alt="Background Shape"
            className="absolute -top-24 -left-24 w-[500px] opacity-90 -z-10"
          />

          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-md mb-6">
            DOWNLOAD
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Download Rentcars <br />
            App for <span className="text-blue-600">FREE</span>
          </h2>

          <p className="text-gray-600 mt-5 max-w-md">
            For faster, easier booking and exclusive deals.
          </p>

        
          <div className="flex gap-4 mt-10">
            <img
              src={googlePlay}
              alt="Google Play"
              className="h-14 cursor-pointer hover:scale-105 transition"
            />
            <img
              src={AppStore}
              alt="App Store"
              className="h-14 cursor-pointer hover:scale-105 transition"
            />
          </div>
        </div>

        
        <div className="relative mt-20 lg:mt-0 flex justify-center lg:justify-end">
          
          <img
            src={downloadMbl}
            alt="Mobile Frame"
            className="w-[320px] lg:w-[380px]"
          />
          
          <img
            src={downloadAppCar}
            alt="Car"
            className="absolute top-28 left-1/2 -translate-x-1/2 w-[260px]"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
