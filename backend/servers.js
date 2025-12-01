const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importar Rutas
const authRoutes = require('./routes/auth');
const medicamentoRoutes = require('./routes/medicamento');
const pedidoRoutes = require('./routes/pedidos');
const centroRoutes = require('./routes/centros'); // <-- Nuevo
const recordatorioRoutes = require('./routes/recordatorios'); // <-- Nuevo

// Usar Rutas
app.use('/api', authRoutes);
app.use('/api', medicamentoRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', centroRoutes); // <-- Nuevo
app.use('/api', recordatorioRoutes); // <-- Nuevo

mongoose.connect('mongodb://127.0.0.1:27017/nature-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  // Aseguramos que el puerto sea 8082 en código y mensaje
  app.listen(8082, () => console.log('🚀 Servidor corriendo en http://192.168.1.1:8082'));
})
.catch((error) => console.error('❌ Error al conectar a MongoDB:', error));