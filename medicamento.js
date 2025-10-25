const express = require('express');
const router = express.Router();
const Medicamento = require('../models/Medicamentos');

router.get('/', async (req, res) => {
  try {
    const medicamentos = await Medicamento.find();
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener medicamentos' });
  }
});

module.exports = router;
