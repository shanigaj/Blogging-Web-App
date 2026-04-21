import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Users Page</h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className=" min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
