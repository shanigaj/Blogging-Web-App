import React, { useEffect, useState } from "react";
import API from "../../api/api";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  const createPost = async () => {
    const res = await API.post("/posts", form);
    setPosts([...posts, res.data]);
  };

  const deletePost = async (id) => {
    await API.delete(`/posts/${id}`);
    setPosts(posts.filter((post) => post._id !== id));
  };

  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-3xl font-bold mb-6">Posts</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        ></input>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Content"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={createPost}
        >
          Add Post
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border-b p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p>{post.content}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
