const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Cadastro de usuário
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    await User.create({ username, email, password });
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro no cadastro" });
  }
});

module.exports = router;
