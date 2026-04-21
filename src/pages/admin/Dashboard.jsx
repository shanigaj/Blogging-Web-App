import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          API.get("/users"),
          API.get("/posts"),
        ]);
        setStats({
          users: usersRes.data?.length || 0,
          posts: postsRes.data?.length || 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back{user.name ? `, ${user.name}` : ""}! Manage your blog from here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "..." : stats.users}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "..." : stats.posts}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/admin/users"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Manage Users
              </h3>
              <p className="text-sm text-gray-500">View, edit and remove users</p>
            </div>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            to="/admin/posts"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-green-200 transition-all flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 group-hover:bg-green-200 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Manage Posts
              </h3>
              <p className="text-sm text-gray-500">Create, edit and delete blog posts</p>
            </div>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-green-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}