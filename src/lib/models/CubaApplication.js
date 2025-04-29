import mongoose from 'mongoose';

const CubaApplicationSchema = new mongoose.Schema({
  // Personal Information
  nombreCompleto: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },

  // Passport Details
  numeroPasaporte: { type: String, required: true },

  // Travel Information
  fechaEntradaEstimada: { type: Date, required: true },
  direccionAlojamientoCuba: { type: String, required: true },
  vueloEntrada: { type: String },

  // Contact Information
  direccionResidencia: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },

  // Delivery Information
  metodoEntrega: {
    type: String,
    enum: ['correo', 'recogida'],
    required: true
  },
  direccionEnvio: { type: String },

  // Legal
  consentimientoProcesamiento: { type: Boolean, required: true },

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
const CubaApplication = mongoose.models.CubaApplication || mongoose.model('CubaApplication', CubaApplicationSchema);

export default CubaApplication; 