import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    await API.post("/auth/register", form);
    alert("Registration successful");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 rounded py-2 px-4 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 rounded py-2 px-4 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 rounded py-2 px-4 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
