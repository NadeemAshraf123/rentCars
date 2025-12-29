import React from "react";
import AppIcon from '../../../assets/icons/AppIcon.png';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/authslice/authSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NAV_ITEMS: string[] = [
  "Become a renter",
  "Rental deals",
  "How it work",
  "Why choose us",
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const handleHome = () => navigate('/');
  const handleLogout = () => {
    dispatch(logout());
    toast.success('User signed out successfully 👋', {
      position: 'top-right',
      autoClose: 3000,
    });
  };
  const handleDashboard = () => navigate('/dashboard');

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={handleHome}
          >
            <img src={AppIcon} alt="appicon" className="w-8 h-8 inline-block mr-2" />
            RENTCARS
          </div>

          {/* Navigation items */}
          <nav className="hidden md:flex space-x-3">
            {NAV_ITEMS.map((label) => (
              <button
                key={label}
                className="text-lg font-sm text-gray-700 px-8 py-2 rounded-xl hover:bg-blue-100 transition"
              >
                {label}
              </button>
            ))}

            {/* ✅ Dashboard nav item (owner only) */}
            {user?.role === "owner" && (
              <button
                onClick={handleDashboard}
                className="text-lg font-sm text-gray-700 px-8 py-2 rounded-xl hover:bg-blue-100 transition"
              >
                Dashboard
              </button>
            )}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <button
                  onClick={handleLogin}
                  className="text-sm font-medium bg-red-500 text-gray-700 px-6 py-3 rounded-lg hover:bg-[#1572d3] text-white transition"
                >
                  Sign in
                </button>
                <button
                  onClick={handleSignup}
                  className="text-sm font-medium px-6 py-3 bg-gray-700 text-gray-700 rounded-lg hover:bg-[#1572d3] text-white"
                >
                  Sign up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-6 py-3 bg-gray-700 text-gray-700 rounded-lg hover:bg-[#1572d3] text-white cursor-pointer"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
