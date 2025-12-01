const express = require('express');
const router = express.Router();
const Recordatorio = require('../models/Recordatorio');

router.get('/recordatorios/:usuarioId', async (req, res) => {
  try { const recs = await Recordatorio.find({ usuarioId: req.params.usuarioId }); res.json(recs); }
  catch (e) { res.status(500).json({msg: 'Error'}); }
});

router.post('/recordatorios', async (req, res) => {
  try { const nuevo = new Recordatorio(req.body); await nuevo.save(); res.json(nuevo); }
  catch (e) { res.status(500).json({msg: 'Error'}); }
});
module.exports = router;