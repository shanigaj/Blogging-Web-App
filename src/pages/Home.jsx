import {useEffect, useState} from "react"
import API from "../api/api";


export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.get("/posts").then(res => setPosts(res.data));
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {posts.map(post => (
                <div key={post.id} className="border border-gray-300 rounded py-2 px-4 mb-3">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-gray-600">{post.content}</p>
                </div>
            ))}
        </div>
    )
}