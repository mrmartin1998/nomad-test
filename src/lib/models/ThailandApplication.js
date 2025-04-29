import mongoose from 'mongoose';

const ThailandApplicationSchema = new mongoose.Schema({
  // Personal Information
  nombreCompleto: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  nacionalidad: { type: String, required: true },

  // Contact Information
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  direccionResidencia: { type: String, required: true },

  // Professional Information
  ocupacionActual: { type: String, required: true },
  empresa: { type: String, required: true },
  direccionEmpresa: { type: String, required: true },
  telefonoEmpresa: { type: String, required: true },

  // Passport Details
  numeroPasaporte: { type: String, required: true },
  fechaEmisionPasaporte: { type: Date, required: true },
  fechaExpiracionPasaporte: { type: Date, required: true },

  // Documents (we'll store the file URLs)
  documentos: {
    fotoCarnet: { type: String },
    pasaporteEscaneado: { type: String },
    billeteSalida: { type: String },
    reservaHotel: { type: String }
  },

  // Legal
  consentimientoTerminos: { type: Boolean, required: true },

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
const ThailandApplication = mongoose.models.ThailandApplication || mongoose.model('ThailandApplication', ThailandApplicationSchema);

export default ThailandApplication; 