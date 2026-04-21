import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err))
      .finally(() => setLoading(false));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button + Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/admin"
            className="w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Manage Users
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {users.length} total user{users.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No users found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="py-3.5 px-5 text-left text-sm font-semibold">#</th>
                  <th className="py-3.5 px-5 text-left text-sm font-semibold">Name</th>
                  <th className="py-3.5 px-5 text-left text-sm font-semibold">Email</th>
                  <th className="py-3.5 px-5 text-left text-sm font-semibold">Role</th>
                  <th className="py-3.5 px-5 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3.5 px-5 text-sm text-gray-500">{index + 1}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-bold text-sm">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 font-semibold text-sm py-1.5 px-3 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
