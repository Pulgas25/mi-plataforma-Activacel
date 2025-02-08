const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login de usuarios
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
