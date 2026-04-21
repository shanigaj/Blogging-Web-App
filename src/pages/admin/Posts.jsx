import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch posts", err))
      .finally(() => setLoading(false));
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSubmitting(true);
    try {
      const res = await API.post("/posts", form);
      setPosts([res.data, ...posts]);
      setForm({ title: "", content: "" }); // Clear form after adding
    } catch (err) {
      console.error("Failed to create post", err);
    } finally {
      setSubmitting(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
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
              Manage Posts
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {posts.length} total post{posts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Add Post Form */}
        <form
          onSubmit={createPost}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Post</h2>
          <input
            className="w-full border border-gray-300 rounded-lg py-2.5 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Post Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={submitting}
            required
          />
          <textarea
            className="w-full border border-gray-300 rounded-lg py-2.5 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y min-h-[100px]"
            placeholder="Write your content here..."
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            disabled={submitting}
            required
          />
          <button
            type="submit"
            disabled={submitting || !form.title.trim() || !form.content.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            {submitting && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {submitting ? "Adding..." : "Add Post"}
          </button>
        </form>

        {/* Posts List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No posts yet. Create your first post above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                  {post.content}
                </p>
                {post.createdAt && (
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
                <div className="mt-auto pt-3 border-t border-gray-50">
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 font-semibold text-sm py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
