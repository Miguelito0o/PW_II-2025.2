const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar comentários' });
  }
});

router.post('/', async (req, res) => {
  const { postId, user, text } = req.body;

  if (!postId || !user || !text) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const newComment = new Comment({ postId, user, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar comentário' });
  }
});

module.exports = router;
