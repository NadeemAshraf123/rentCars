import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/authslice/authSlice";



export default function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

 const handleSubmit = (e) => {
  e.preventDefault();    
  let newErrors = {};

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);
  
  if (Object.keys(newErrors).length === 0) {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/");
      })
     .catch(() => {
  toast.error("Account does not exist. Please register first 👤", {
    position: "top-right",
    autoClose: 3000,
  });

  setTimeout(() => {
    navigate("/signup");
  }, 2000);
});

  }
};


  const handleSignup = () => { navigate('/signup') }
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-xl rounded-lg mt-20 p-15 space-y-4 focus:outline-none focus:ring-0 focus:border-transparent"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 bg-gray-200 mt-4 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 bg-gray-200 mt-4 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-lg mt-8 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>

       <button
       type="button"
        onClick={handleSignup}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Signup
      </button>
    </form>
  );
}
