const mongoose = require('mongoose');

// Función para generar la matrícula automáticamente
function generarMatricula(apellidoPaterno) {
  const year = new Date().getFullYear().toString().slice(2);  // Últimos 2 dígitos del año
  const semestre = '1'; // Puedes ajustar este valor según el semestre que corresponda
  const firstLetter = apellidoPaterno.charAt(0).toUpperCase();  // Primera letra del apellido paterno
  const consecutivo = ('0000' + Math.floor(Math.random() * 10000)).slice(-4); // Consecutivo de 4 dígitos
  return `${year}${semestre}${firstLetter}${consecutivo}`;
}

// Función para generar el RFC
function generarRFC(nombre, apellidoPaterno, apellidoMaterno, fechaNac) {
  const fecha = new Date(fechaNac);
  const anio = fecha.getFullYear().toString().slice(2); // Dos últimos dígitos del año
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes con 2 dígitos
  const dia = fecha.getDate().toString().padStart(2, '0'); // Día con 2 dígitos

  // Generar RFC basado en el formato
  return `${apellidoPaterno.charAt(0)}${apellidoMaterno.charAt(0)}${nombre.charAt(0)}${anio}${mes}${dia}`;
}

const alumnoSchema = new mongoose.Schema({
  matricula: { type: String, unique: true, required: true },
  foto: String,
  apellido_paterno: String,
  apellido_materno: String,
  nombre: String,
  fecha_alta: { type: Date, default: Date.now },
  fecha_nacimiento: Date,
  sexo: String,
  nombre_actividad: { type: String, required: false, default: null },  // Nuevo campo
  fecha_inicio_actividad: { type: Date, required: false, default: null }, // Nuevo campo
  fecha_fin_actividad: { type: Date, required: false, default: null },  // Nuevo campo
  telefonos: [String],
  correos: [String],
  promedio_bachillerato: Number,
  especialidad_bachillerato: String,
  rfc: String,
  rol: { type: Number, default: 1 },
  contrasenia: String,
  domicilio: {
    calle: String,
    numero_interior: String,
    numero_exterior: String,
    colonia: String,
    codigo_postal: String,
    ciudad: String
  },
  tutores: [
    {
      apellido_paterno: String,
      apellido_materno: String,
      nombre: String,
      telefono: [String],
      correo: String,
      domicilio: {
        calle: String,
        numero_exterior: String,
        numero_interior: String,
        colonia: String,
        codigo_postal: String,
        ciudad: String
      }
    }
  ],
  carrera: {
    nombre: String,
    especialidad: String
  },
  certificado_bachillerato: { type: Number, default: 0 }  // 1 para "Sí", 0 para "No"
});


// Middleware para generar la matrícula y el RFC antes de guardar
alumnoSchema.pre('save', function (next) {
  if (this.isNew) {
    // Generar matrícula
    this.matricula = generarMatricula(this.apellido_paterno);

    // Generar RFC
    this.rfc = generarRFC(this.nombre, this.apellido_paterno, this.apellido_materno, this.fecha_nacimiento);
  }
  next();
});


const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;
