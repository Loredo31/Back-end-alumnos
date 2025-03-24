const Alumno = require('../models/alumnosModel'); // Importa el modelo de alumnos

// Obtener el último consecutivo
exports.obtenerUltimoConsecutivo = async (req, res) => {
  try {
    // Buscar el último alumno por matrícula, ordenado de forma descendente
    const ultimoAlumno = await Alumno.findOne().sort({ matricula: -1 }); 

    let consecutivo = 1; // Valor inicial del consecutivo

    if (ultimoAlumno) {
      const claveSplit = ultimoAlumno.matricula.slice(4); // Obtener solo el consecutivo
      consecutivo = parseInt(claveSplit, 10) + 1; // Incrementar el consecutivo
    }

    // Asegurarnos que el consecutivo sea de 4 dígitos
    const consecutivoFormateado = consecutivo.toString().padStart(4, '0');

    res.json({ consecutivo: consecutivoFormateado }); // Responde con el consecutivo
  } catch (error) {
    console.error('Error al obtener el consecutivo:', error);
    res.status(500).json({ error: 'Error al obtener el consecutivo' });
  }
};
