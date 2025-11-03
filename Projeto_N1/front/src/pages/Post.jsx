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
  const [user, setUser] = useState('');

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
    if (!newComment || !user) return;

    try {
      await axios.post('http://localhost:3000/comments', {
        postId: id,
        user,
        text: newComment
      });
      setNewComment('');
      setUser('');
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
        user={user}
        text={newComment}
        setUser={setUser}
        setText={setNewComment}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default PostDetail;
