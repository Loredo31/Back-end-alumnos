const express = require('express');
const {crearAlumno} = require('../controllers/alumnosController');
//const alumnosController = require('../controllers/alumnosController');
const router = express.Router();

// Ruta para registrar un nuevo empleado
router.post('/alumnos', crearAlumno);


//router.get('/ultimo-consecutivo', alumnosController.obtenerUltimoConsecutivo);


module.exports = router;