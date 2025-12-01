const mongoose = require('mongoose');
const centroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  comuna: { type: String },
  telefono: { type: String },
  latitud: Number, longitud: Number
});
module.exports = mongoose.model('Centro', centroSchema);