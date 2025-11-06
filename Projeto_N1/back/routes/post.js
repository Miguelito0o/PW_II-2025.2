const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find().sort({ createdAt: -1});
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar posts'});
    }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar post' });
  }
});

const auth = require('../middleware/auth');

const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token ausente' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { title, text } = req.body;

    const newPost = new Post({
      title,
      text,
      user: decoded.name
    });

    await newPost.save();
    res.status(201).json({ message: 'Post criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ message: 'Erro ao criar post' });
  }
});



module.exports = router;