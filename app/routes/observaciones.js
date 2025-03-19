const express = require('express');
const router = express.Router();
const observacionesController = require('../controllers/observacionesController');

// Ruta para obtener todas las observaciones de un profesor específico
router.get('/profesor/:profesorId', observacionesController.obtenerObservacionesPorProfesor);

// Ruta para agregar una nueva observación
router.post('/', observacionesController.agregarObservacion);

// Ruta para eliminar una observación por su ID
router.delete('/:id', observacionesController.eliminarObservacion);

module.exports = router;
