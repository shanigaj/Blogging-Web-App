import { useEffect, useState } from "react";
import API from "../api/api";
import AdBanner from "../components/AdBanner";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="p-4">
      <AdBanner id="ad-top" />
      <div className="flex gap-4 mt-4">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Blog</h1>
          {posts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded py-2 px-4 mb-3"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
            </div>
          ))}
          <AdBanner id="ad-mid-1" />

          {posts.slice(2, 4).map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded py-2 px-4 mb-3"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
            </div>
          ))}

          <AdBanner id="ad-mid-2" />

          {posts.slice(4, 6).map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded py-2 px-4 mb-3"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
            </div>
          ))}

          <AdBanner id="ad-mid-3" />
        </div>

        <div className="w-1/4">
          <AdBanner id="ad-sidebar" />
        </div>
      </div>

      <AdBanner id="ad-bottom" />


      <div className="fixed bottom-0 w-full bg-white shadow">
        <AdBanner id="ad-footer" />
      </div>
    </div>
  );
}
