const express = require('express');
const router = express.Router();
const User = require('../models/Usuario');

router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

 try {
    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new User({ nombre, email, password });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    res.status(200).json({ message: 'Login exitoso', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
