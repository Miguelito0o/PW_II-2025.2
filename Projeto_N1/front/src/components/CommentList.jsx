function CommentList({ comments }) {
  if (comments.length === 0) return <p>Seja o primeiro a comentar!</p>;

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p><strong>{comment.user}</strong>: {comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
