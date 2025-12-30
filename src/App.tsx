import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layout/header/Header";
import HeroSection from "./components/pages/home/HeroSection";
import SearchBar from "./components/searchbar/SearchBar";
import HowItWorks from "./components/howitworks/HowItWorks";
import WhyChooseUs from "./components/whychooseus/WhyChooseUs";
import PopularRentalDeals from "./components/pages/popularrentaldeals/PopularRentalDeals";
import Testimonials from "./components/pages/home/Testimonials";
import DownloadApp from "./components/pages/home/DownloadApp";
import Footer from "./components/pages/home/Footer";

import LoginForm from "./components/auth/Login";
import SignupForm from "./components/auth/Signup";
import AddCarForm from "./components/pages/popularrentaldeals/AddCarForm";
import Dashboard from "./components/dashboard/Dashboard"; 
import Booking from "./components/dashboard/BookingCars";
import Feedback from "./components/pages/feedback/FeedBack";

function OwnerRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "owner") {
      toast.error("Access denied. Owners only.");
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== "owner") {
    return null;
  }

  return children;
}

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
  
      <Header user={user} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="px-[46px]">
                <HeroSection />
                {user && <SearchBar />}
                <HowItWorks />
              </div>

              <WhyChooseUs />

              <div className="px-[46px]">
                <PopularRentalDeals />
              </div>

              <Testimonials />
              <DownloadApp />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/booking" element={<Booking />} /> 
        <Route path="/feedback" element= { <Feedback />  } />


        <Route
          path="/addcarform"
          element={
            <OwnerRoute>
              <AddCarForm />
            </OwnerRoute>
          }
        />

        
        <Route
          path="/dashboard"
          element={
            <OwnerRoute>
              <Dashboard />
            
            </OwnerRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
