import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/posts', { title, text, user });
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar novo post</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Texto"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <button type="submit">Publicar</button>
    </form>
  );
}

export default CreatePost;
