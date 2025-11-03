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

router.post('/', async (req, res) => {
    const { title, text, user} = req.body;
    if (!user || !title || !text){
        return res.status(400).json({ message: 'Todos os campos são obrigatórios'});
    }

    try{
        const newPost = new Post({title, text, user});
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(500).json({ message: 'Erro ao criar post'});
    }
});

module.exports = router;