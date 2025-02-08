const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Ruta protegida para agregar usuarios
router.post('/addUser', authMiddleware, async (req, res) => {
  const { username, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'Usuario agregado correctamente' });
});

module.exports = router;
