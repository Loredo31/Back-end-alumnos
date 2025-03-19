const express = require('express');
const {crearAlumno,
       obtenerAlumnoPorId,
       obtenerAlumnos,
       actualizarAlumno,
       eliminarAlumno
} = require('../controllers/alumnosController');
//const alumnosController = require('../controllers/alumnosController');
const router = express.Router();

// Rutas CRUD
router.post('/alumnos', crearAlumno);          // Crear alumno
router.get('/alumnos', obtenerAlumnos);        // Obtener todos los alumnos
router.get('/alumnos/:id', obtenerAlumnoPorId); // Obtener un alumno por ID
router.put('/alumnos/:id', actualizarAlumno);  // Actualizar un alumno por ID
router.delete('/alumnos/:id', eliminarAlumno); // Eliminar un alumno por ID


//router.get('/ultimo-consecutivo', alumnosController.obtenerUltimoConsecutivo);


module.exports = router;