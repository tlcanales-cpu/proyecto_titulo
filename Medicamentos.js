const mongoose = require('mongoose');

const medicamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  categoria: { type: String },
  precio: { type: Number, required: true }
});

module.exports = mongoose.model('Medicamento', medicamentoSchema);