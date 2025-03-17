const express = require('express');
const { crearAlumno, obtenerAlumno, actualizarAlumno,obtenerAlumnos } = require('../controllers/alumnosController');
const router = express.Router();

// Ruta para obtener la lista de todos los alumnos
router.get('/alumnos', obtenerAlumnos);

// Ruta para registrar un nuevo alumno
router.post('/alumnos', crearAlumno);

// Ruta para obtener un alumno por su matrícula
router.get('/alumnos/:id', obtenerAlumno);

// 🔹 Nueva ruta para actualizar los datos del alumno
router.put('/alumnos/:id', actualizarAlumno);

module.exports = router;
