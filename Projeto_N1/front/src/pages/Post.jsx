import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostContent from '../components/PostContent';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import '../style/style.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3000/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    try {
      await axios.post('http://localhost:3000/comments', {
        postId: id,
        user: userName,
        text: newComment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewComment('');
      const res = await axios.get(`http://localhost:3000/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  if (!post) return <p>Carregando post...</p>;

  return (
    <div className="container">
      <PostContent post={post} />
      <hr />
      <h2>Comentários</h2>
      <CommentList comments={comments} />
      <CommentForm
        text={newComment}
        setText={setNewComment}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default PostDetail;
