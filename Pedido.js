const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  medicamentos: [{
    _id: false,
    nombre: String,
    precio: Number
  }],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, default: 'pendiente' } // pendiente, entregado, etc.
});

module.exports = mongoose.model('Pedido', pedidoSchema);

