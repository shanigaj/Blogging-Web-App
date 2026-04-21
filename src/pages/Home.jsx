import { useEffect, useState } from "react";
import API from "../api/api";
import AdBanner from "../components/AdBanner";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch posts", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-24">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Leaderboard Ad */}
        <div className="mb-10 w-full flex justify-center">
          <AdBanner id="ad-leaderboard-top" width={728} height={90} className="w-full max-w-[728px] hidden md:flex" />
          <AdBanner id="ad-leaderboard-top-mobile" width={320} height={50} className="w-full max-w-[320px] md:hidden flex" />
        </div>

        <header className="mb-10 border-b border-gray-200 pb-5">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Latest Stories</h1>
          <p className="text-gray-500 mt-2 text-lg">Insights and updates from the technology world.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content Area */}
          <main className="w-full lg:w-8/12 flex flex-col gap-8">
            {loading ? (
              <p className="text-gray-500 animate-pulse text-lg py-10">Loading stories...</p>
            ) : (
              <>
                {/* First 2 posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.slice(0, 2).map((post) => (
                    <PostCard key={`post-${post.id}`} post={post} />
                  ))}
                </div>

                {/* Middle Banner Ad 1 */}
                <div className="w-full flex justify-center py-2">
                  <AdBanner id="ad-mid-1" width={728} height={90} className="w-full max-w-[728px] hidden md:flex" />
                  <AdBanner id="ad-mid-1-mobile" width={300} height={250} className="w-full max-w-[300px] md:hidden flex" />
                </div>

                {/* Next 2 posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.slice(2, 4).map((post) => (
                    <PostCard key={`post-${post.id}`} post={post} />
                  ))}
                </div>

                {/* Middle Banner Ad 2 */}
                <div className="w-full flex justify-center py-2">
                  <AdBanner id="ad-mid-2" width={728} height={90} className="w-full max-w-[728px] hidden md:flex" />
                  <AdBanner id="ad-mid-2-mobile" width={300} height={250} className="w-full max-w-[300px] md:hidden flex" />
                </div>

                {/* Last 2 posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.slice(4, 6).map((post) => (
                    <PostCard key={`post-${post.id}`} post={post} />
                  ))}
                </div>
              </>
            )}
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-4/12 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-3">About Us</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Welcome to our blogging platform where we share the latest news in tech, programming, and design. Stay tuned for expert insights and updates!
              </p>
            </div>

            {/* Sidebar Ad 1 (Medium Rectangle) */}
            <div className="flex justify-center md:sticky md:top-6">
              <AdBanner id="ad-sidebar-1" width={300} height={250} className="w-full max-w-[300px]" />
            </div>
            
            {/* Sidebar Ad 2 (Half Page) */}
            <div className="flex justify-center mt-2">
              <AdBanner id="ad-sidebar-2" width={300} height={600} className="w-full max-w-[300px] hidden lg:flex" />
            </div>
          </aside>
        </div>

        {/* Bottom Leaderboard Ad */}
        <div className="mt-14 mb-4 flex justify-center border-t border-gray-200 pt-10">
          <AdBanner id="ad-leaderboard-bottom" width={728} height={90} className="w-full max-w-[728px] hidden md:flex" />
          <AdBanner id="ad-leaderboard-bottom-mobile" width={320} height={100} className="w-full max-w-[320px] md:hidden flex" />
        </div>
      </div>

      {/* Sticky Mobile/Desktop Footer Ad */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-50 flex justify-center items-center py-2 md:py-3">
        <AdBanner id="ad-footer-anchor" width={728} height={90} className="w-full max-w-[728px] hidden md:flex" />
        <AdBanner id="ad-footer-anchor-mobile" width={320} height={50} className="w-full max-w-[320px] md:hidden flex" />
      </div>
    </div>
  );
}

// Small functional component to render posts elegantly
function PostCard({ post }) {
  return (
    <article className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
        {post.title}
      </h2>
      <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
        {post.content}
      </p>
      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-end">
        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors flex items-center gap-1 group">
          Read more
          <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
        </button>
      </div>
    </article>
  );
}
