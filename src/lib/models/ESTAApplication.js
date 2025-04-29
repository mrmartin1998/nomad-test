import mongoose from 'mongoose';

const ESTAApplicationSchema = new mongoose.Schema({
  // Personal Information
  nombreCompleto: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  ciudadNacimiento: { type: String, required: true },
  paisNacimiento: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  nombrePadre: { type: String, required: true },
  nombreMadre: { type: String, required: true },

  // Contact Information
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  direccionResidencia: { type: String, required: true },

  // Passport Details
  numeroPasaporte: { type: String, required: true },
  fechaEmisionPasaporte: { type: Date, required: true },
  fechaExpiracionPasaporte: { type: Date, required: true },
  paisEmisionPasaporte: { type: String, required: true },

  // Travel Information
  viajeAnteriorUSA: { type: Boolean, required: true },
  direccionUSA: { type: String, required: true },
  empresa: { type: String, required: true },
  cargo: { type: String, required: true },
  direccionLaboral: { type: String, required: true },

  // Security & Legal
  antecedentesPenales: { type: Boolean, required: true },
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
const ESTAApplication = mongoose.models.ESTAApplication || mongoose.model('ESTAApplication', ESTAApplicationSchema);

export default ESTAApplication; 