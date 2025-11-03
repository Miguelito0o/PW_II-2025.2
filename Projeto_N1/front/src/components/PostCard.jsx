import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.text.slice(0, 150)}...</p>
      <Link to={`/posts/${post._id}`}>Ver mais</Link>
    </div>
  );
}

export default PostCard;
