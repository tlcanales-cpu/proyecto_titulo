const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// Guardar nuevo pedido
router.post('/', async (req, res) => {
  const { usuarioId, medicamentos, total } = req.body;

  try {
    const nuevoPedido = new Pedido({ usuario: usuarioId, medicamentos, total });
    await nuevoPedido.save();
    res.status(201).json({ message: 'Pedido guardado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el pedido' });
  }
});

// Obtener pedidos por usuario
router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const pedidos = await Pedido.find({ usuario: usuarioId }).sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
});

module.exports = router;
