import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-100"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 rounded-lg py-2.5 px-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 rounded-lg py-2.5 px-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 rounded-lg py-2.5 px-4 mb-5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

