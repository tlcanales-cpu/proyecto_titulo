const express = require('express');
const router = express.Router();
const Centro = require('../models/Centro');

router.get('/centros', async (req, res) => {
  try { const centros = await Centro.find(); res.json(centros); }
  catch (e) { res.status(500).json({msg: 'Error'}); }
});
// Endpoint temporal para cargar datos si está vacío
router.post('/centros', async (req, res) => {
    const nuevo = new Centro(req.body);
    await nuevo.save();
    res.json({msg: 'Centro creado'});
});
module.exports = router;