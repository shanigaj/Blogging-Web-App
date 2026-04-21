import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">BlogApp</h1>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>

        {!token && (
          <>
            <Link to="/login" className="hover:text-yellow-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-400">
              Register
            </Link>
          </>
        )}

        {token && role === "admin" && (
          <Link to="/admin" className="hover:text-yellow-400">
            Admin
          </Link>
        )}

        {token && (
          <button
            className="hover:text-yellow-400 bg-red-500 px-2 py-1 rounded text-sm font-medium hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
