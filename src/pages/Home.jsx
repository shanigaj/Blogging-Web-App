import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import AdBanner from "../components/AdBanner";

const ADS_EVERY = 3; // Insert an ad after every 3 posts

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch posts", err);
        setError("Unable to load posts. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Build content rows: posts + ad banners injected every ADS_EVERY posts
  const buildContentRows = () => {
    const rows = [];
    let adCounter = 1;

    for (let i = 0; i < posts.length; i += ADS_EVERY) {
      const chunk = posts.slice(i, i + ADS_EVERY);

      // Post grid for this chunk
      rows.push(
        <div key={`chunk-${i}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chunk.map((post) => (
            <PostCard key={post._id || post.id} post={post} />
          ))}
        </div>
      );

      // Insert an ad after this chunk (but not after the last chunk)
      if (i + ADS_EVERY < posts.length) {
        rows.push(
          <div key={`ad-mid-${adCounter}`} className="w-full flex justify-center py-3">
            <AdBanner
              id={`ad-mid-${adCounter}`}
              width={728}
              height={90}
              className="w-full max-w-[728px]"
            />
          </div>
        );
        adCounter++;
      }
    }

    return rows;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Top Leaderboard Ad */}
        <div className="mb-8 w-full flex justify-center">
          <AdBanner id="ad-leaderboard-top" width={728} height={90} className="w-full max-w-[728px]" />
        </div>

        <header className="mb-8 border-b border-gray-200 pb-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Latest Posts
          </h1>
          <p className="text-gray-500 mt-2 text-base sm:text-lg">
            Read our latest articles and stories.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main Content */}
          <main className="w-full lg:w-8/12 flex flex-col gap-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <svg
                  className="animate-spin h-10 w-10 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-5 py-4 text-center">
                {error}
              </div>
            ) : posts.length === 0 ? (
              <p className="text-gray-400 text-center py-16 text-lg">No posts available yet.</p>
            ) : (
              buildContentRows()
            )}
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-4/12 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-3">
                About Us
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Welcome to our blogging platform. Stay tuned for the latest updates and expert insights!
              </p>
            </div>

            {/* Sidebar Ad - Medium Rectangle */}
            <div className="flex justify-center sticky top-6">
              <AdBanner id="ad-sidebar-1" width={300} height={250} className="w-full max-w-[300px]" />
            </div>

            {/* Sidebar Ad - Half Page (desktop only) */}
            <div className="hidden lg:flex justify-center">
              <AdBanner id="ad-sidebar-2" width={300} height={600} className="w-full max-w-[300px]" />
            </div>
          </aside>
        </div>

        {/* Bottom Leaderboard Ad */}
        <div className="mt-12 flex justify-center border-t border-gray-200 pt-8">
          <AdBanner id="ad-leaderboard-bottom" width={728} height={90} className="w-full max-w-[728px]" />
        </div>
      </div>

      {/* Sticky Footer Ad */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] z-50 flex justify-center items-center py-2">
        <AdBanner id="ad-footer-anchor" width={728} height={90} className="w-full max-w-[728px]" />
      </div>
    </div>
  );
}

/* Post Card Component */
function PostCard({ post }) {
  const postId = post._id || post.id;

  return (
    <Link to={`/posts/${postId}`} className="block h-full">
      <article className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full cursor-pointer group">
        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
          {post.content}
        </p>
        <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
          {post.createdAt && (
            <span className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Read more &rarr;
          </span>
        </div>
      </article>
    </Link>
  );
}
