import mongoose from 'mongoose';

const IndiaApplicationSchema = new mongoose.Schema({
  // Personal Information
  nombreCompleto: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  lugarNacimiento: { type: String, required: true },
  nacionalidad: { type: String, required: true },

  // Contact Information
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  direccionResidencia: { type: String, required: true },

  // Professional Information
  ocupacionActual: { type: String, required: true },
  nombreEmpresa: { type: String, required: true },
  direccionEmpleador: { type: String, required: true },
  telefonoEmpleador: { type: String, required: true },

  // Passport Details
  numeroPasaporte: { type: String, required: true },
  fechaEmisionPasaporte: { type: Date, required: true },
  fechaExpiracionPasaporte: { type: Date, required: true },

  // Travel Information
  aeropuertoEntrada: { type: String, required: true },
  fechaLlegadaPrevista: { type: Date, required: true },
  alojamientoIndia: { type: String, required: true },

  // References
  referenciaIndia: {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true }
  },
  referenciaEspana: {
    nombre: { type: String, required: true },
    relacion: { type: String, required: true },
    telefono: { type: String, required: true }
  },

  // Documents (we'll store the file URLs)
  documentos: {
    fotoCarnet: { type: String },
    pasaporteEscaneado: { type: String }
  },

  // Legal
  aceptaTerminos: { type: Boolean, required: true },

  // Application Status
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  },

  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate model initialization
const IndiaApplication = mongoose.models.IndiaApplication || mongoose.model('IndiaApplication', IndiaApplicationSchema);

export default IndiaApplication; 