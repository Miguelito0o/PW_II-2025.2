const express = require('express');
const router = express.router();
const Comment = require('../models/Comment');

router.get('/:postId', async (req, res) => {
    try{
        const comments = await Comment.find({ postId: req.params.postId}).sort({ createdAt: -1 });
        res.json(comments);
    }
    catch (error){
        res.status(500).res.json({ message: "Erro ao buscar comentários"})
    }
});

router.post('/', async (req, res) => {

})
