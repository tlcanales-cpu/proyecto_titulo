const mongoose = require('mongoose');
const recordatorioSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  medicamento: { type: String, required: true },
  dosis: { type: String },
  hora: { type: String, required: true },
  activo: { type: Boolean, default: true }
});
module.exports = mongoose.model('Recordatorio', recordatorioSchema);