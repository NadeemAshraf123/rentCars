import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
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

// 🔐 OWNER PROTECTED ROUTE
function OwnerRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "owner") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />

      <Routes>
        {/* HOME */}
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

        {/* AUTH */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* 🔐 OWNER ONLY */}
        <Route
          path="/addcarform"
          element={
            <OwnerRoute>
              <AddCarForm />
            </OwnerRoute>
          }
        />
      </Routes>

      {/* 🌍 GLOBAL TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;
