const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');
const fetch = require('node-fetch'); // Asegúrate de tener instalado: npm install node-fetch

// Crear pedido y enviar notificación
router.post('/pedidos', async (req, res) => {
  const { usuarioId, medicamentos, total } = req.body;

  try {
    const nuevoPedido = new Pedido({
      usuarioId,
      medicamentos,
      total
    });

    await nuevoPedido.save();

    // Buscar pushToken del usuario
    const usuario = await Usuario.findById(usuarioId);
    const pushToken = usuario.pushToken;

    // Enviar notificación push si existe token
    if (pushToken) {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          title: '✅ Pedido confirmado',
          body: 'Tu pedido ha sido recibido y está siendo preparado.',
        }),
      });
    }

    res.status(201).json({ message: 'Pedido creado y notificado exitosamente' });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
});


// Obtener pedidos por usuario
router.get('/pedidos/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const pedidos = await Pedido.find({ usuarioId }).sort({ fecha: -1 });
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
});

module.exports = router;
