const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // <-- NUEVO: Importamos bcrypt

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password, direccion, telefono, pushToken } = req.body;

  try {
    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // --- Inicio de la encriptación --- // <-- NUEVO
    // 1. Generamos un 'salt' (una capa extra de seguridad)
    const salt = await bcrypt.genSalt(10); 
    // 2. Hasheamos (encriptamos) la contraseña que nos dio el usuario
    const hashedPassword = await bcrypt.hash(password, salt);
    // --- Fin de la encriptación --- //

    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      password: hashedPassword, // <-- MODIFICADO: Guardamos la contraseña encriptada
      direccion, 
      telefono, 
      pushToken 
    });
    
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en /register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, pushToken } = req.body;

  try {
    // --- Inicio de la lógica de login segura --- //
    
    // 1. Buscamos al usuario SÓLO por el email
    const usuario = await Usuario.findOne({ email }); // <-- MODIFICADO
    
    // 2. Si el email no existe, enviamos un error genérico
    if (!usuario) {
      // (No decimos "email no encontrado" por seguridad)
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 3. Si encontramos el email, comparamos la contraseña
    const isMatch = await bcrypt.compare(password, usuario.password); // <-- NUEVO

    // 4. Si las contraseñas no coinciden, enviamos el mismo error
    if (!isMatch) { // <-- NUEVO
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // --- Fin de la lógica de login segura --- //

    // Si llegamos aquí, ¡el login es exitoso!
    
    // Actualizar pushToken si viene uno nuevo
    if (pushToken && pushToken !== usuario.pushToken) {
      usuario.pushToken = pushToken;
      await usuario.save();
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;