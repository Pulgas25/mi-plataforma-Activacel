const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const port = 3000;

// Conexión a MongoDB (asegúrate de tener MongoDB corriendo)
mongoose.connect('mongodb://localhost:27017/plataforma', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch((error) => console.error('Error de conexión:', error));

// Middleware para leer JSON
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
