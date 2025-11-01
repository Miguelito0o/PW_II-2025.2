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