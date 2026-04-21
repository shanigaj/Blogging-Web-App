import React from "react"
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard! Here you can manage users, posts, and view analytics.</p>

            <div className="grid grid-cols-2 gap-4">
                <Link to="/admin/users" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Manage Users
                </Link>
                <Link to="/admin/posts" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Manage Posts
                </Link>
            </div>
        </div>
    )
}