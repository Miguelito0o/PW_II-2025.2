import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState('');

  // Buscar o post
  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Buscar comentários do post
  useEffect(() => {
    axios.get(`http://localhost:3000/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Enviar novo comentário
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment || !user) return;

    try {
      await axios.post('http://localhost:3000/comments', {
        postId: id,
        user,
        text: newComment
      });
      setNewComment('');
      setUser('');
      // Atualiza lista de comentários
      const res = await axios.get(`http://localhost:3000/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  if (!post) return <p>Carregando post...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p><strong>Autor:</strong> {post.user}</p>

      <hr />
      <h2>Comentários</h2>
      {comments.length === 0 ? (
        <p>Seja o primeiro a comentar!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id}>
            <p><strong>{comment.user}</strong>: {comment.text}</p>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit}>
        <h3>Adicionar comentário</h3>
        <input
          type="text"
          placeholder="Seu nome"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <textarea
          placeholder="Seu comentário"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default PostDetail;
