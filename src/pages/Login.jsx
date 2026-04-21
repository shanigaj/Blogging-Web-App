import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", JSON.stringify(res.data.user.role));
    console.log(localStorage.getItem("token"));
    alert("Login successful");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 rounded w-full py-2 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 rounded w-full py-2 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
