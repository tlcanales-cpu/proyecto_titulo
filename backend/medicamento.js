const express = require('express');
const router = express.Router();
const Medicamento = require('../models/Medicamentos');

// Obtener todos los medicamentos (CON LÓGICA DE FILTRADO Y BÚSQUEDA)
router.get('/medicamentos', async (req, res) => {
  try {
    // 1. Obtenemos los posibles query params de la URL
    const { nombre, categoria } = req.query; // <-- NUEVO

    // 2. Creamos un objeto de filtro dinámico para Mongoose
    const filtro = {}; // <-- NUEVO

    if (nombre) { // <-- NUEVO
      // Si se provee un 'nombre', usamos una expresión regular ($regex)
      // para buscar coincidencias parciales (ej: "Para" encontrará "Paracetamol").
      // La opción 'i' lo hace case-insensitive (ignora mayúsculas/minúsculas).
      filtro.nombre = { $regex: nombre, $options: 'i' };
    }

    if (categoria) { // <-- NUEVO
      // Si se provee 'categoria', buscamos una coincidencia exacta.
      filtro.categoria = categoria;
    }

    // 3. Pasamos el objeto de filtro (vacío o con datos) a Mongoose
    const medicamentos = await Medicamento.find(filtro); // <-- MODIFICADO

    res.status(200).json(medicamentos);

  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos' });
  }
});

// Crear un medicamento (Sin cambios)
router.post('/medicamentos', async (req, res) => {
  const { nombre, descripcion, categoria, precio } = req.body;

  try {
    const nuevo = new Medicamento({ nombre, descripcion, categoria, precio });
    await nuevo.save();
    res.status(201).json({ message: 'Medicamento creado correctamente' });
  } catch (error) {
    console.error('Error al crear medicamento:', error);
    res.status(500).json({ message: 'Error al crear medicamento' });
  }
});

// Editar un medicamento (Sin cambios)
router.put('/medicamentos/:id', async (req, res) => {
  try {
    await Medicamento.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Medicamento actualizado' });
  } catch (error) {
    console.error('Error al actualizar medicamento:', error);
    res.status(500).json({ message: 'Error al actualizar medicamento' });
  }
});

// Eliminar un medicamento (Sin cambios)
router.delete('/medicamentos/:id', async (req, res) => {
  try {
    await Medicamento.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Medicamento eliminado' });
  } catch (error) {
    console.error('Error al eliminar medicamento:', error);
    res.status(500).json({ message: 'Error al eliminar medicamento' });
  }
});

module.exports = router;