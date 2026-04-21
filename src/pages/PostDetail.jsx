import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  return (
    <div >
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
