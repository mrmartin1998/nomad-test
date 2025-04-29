import mongoose from 'mongoose';

const EgyptApplicationSchema = new mongoose.Schema({
  // Personal Information
  nombreCompleto: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  nacionalidad: { type: String, required: true },

  // Contact Information
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  direccionResidencia: { type: String, required: true },

  // Passport Details
  numeroPasaporte: { type: String, required: true },
  fechaEmisionPasaporte: { type: Date, required: true },
  fechaExpiracionPasaporte: { type: Date, required: true },

  // Travel Information
  itinerarioViaje: {
    fechaEntrada: { type: Date, required: true },
    fechaSalida: { type: Date, required: true }
  },
  alojamientoEgipto: { type: String, required: true },

  // Documents (we'll store the file URLs)
  documentos: {
    fotoCarnet: { type: String },
    pasaporteEscaneado: { type: String }
  },

  // Legal
  consentimientoLegal: { type: Boolean, required: true },

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
const EgyptApplication = mongoose.models.EgyptApplication || mongoose.model('EgyptApplication', EgyptApplicationSchema);

export default EgyptApplication; 