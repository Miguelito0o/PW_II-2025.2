import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) return;


    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/posts', {
        title,
        text
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/');
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  }

  return (
    <div className="container">
      <h2>Criar novo post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <textarea placeholder="Conteúdo" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default CreatePost;
