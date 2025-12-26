import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slice/authslice/authSlice";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function SignupForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleSubmit = (e) => {
  e.preventDefault();
  let newErrors: any = {};

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
  if (!role) {
    newErrors.role = "Role is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    dispatch(signupUser({ email, password, role }))
      .unwrap()
      .then(() => {
        toast.success("Signup successful!");
        navigate("/");
      })
      .catch(() => {
        navigate("/signup");
        toast.error("Signup failed!");
      });
  }
};



const handleLogin = () => { navigate("/login") };


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded mt-20 p-6 space-y-8"
    >
      <h2 className="text-xl font-bold text-center">Signup</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full bg-gray-200 text-gray-500 border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        className="w-full bg-gray-200 text-gray-500 border border-gray-200 p-2 rounded-lg 
        focus:outline-none focus:ring-0 focus:border-transparent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

     <select
  className="w-full bg-gray-200 text-gray-500 p-2 rounded-lg 
             appearance-none border-0 outline-none  border-gray-500
             focus:border-0 focus:outline-none focus:ring-0"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="" className="border-none">-- Select Role --</option>
  <option value="user" className="border-none">User</option>
  <option value="owner" className="border-none">Owner</option>
</select>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Signup
      </button>
      <button
        type="button"
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        login
      </button>

      

    </form>
  );
}
