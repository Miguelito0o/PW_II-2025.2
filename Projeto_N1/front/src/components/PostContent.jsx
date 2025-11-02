function PostContent({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p><strong>Autor:</strong> {post.user}</p>
    </div>
  );
}

export default PostContent;