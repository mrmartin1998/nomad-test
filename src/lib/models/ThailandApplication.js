import mongoose from 'mongoose';

const ThailandApplicationSchema = new mongoose.Schema({
  // User Association (for authenticated users)
  userId: {
    type: String,
    required: true,
    index: true
  },

  // Personal Information
  nombreCompleto: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: String,
    required: true
  },
  lugarNacimiento: {
    type: String,
    required: true
  },
  nacionalidad: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccionResidencia: {
    type: String,
    required: true
  },
  
  // Passport Information
  numeroPasaporte: {
    type: String,
    required: true
  },
  fechaEmisionPasaporte: {
    type: String,
    required: true
  },
  fechaExpiracionPasaporte: {
    type: String,
    required: true
  },
  
  // Travel Information
  fechasViaje: {
    type: String,
    required: true
  },
  alojamiento: {
    type: String,
    required: true
  },
  
  // Professional Information - Make these optional by removing required
  ocupacionActual: {
    type: String,
    required: false,
    default: 'No proporcionado'
  },
  empresa: {
    type: String,
    required: false,
    default: 'No proporcionado'
  },
  direccionEmpresa: {
    type: String,
    required: false,
    default: 'No proporcionado'
  },
  telefonoEmpresa: {
    type: String,
    required: false,
    default: 'No proporcionado'
  },
  
  // Consent - Make this optional by removing required or providing a default
  consentimientoTerminos: {
    type: Boolean,
    required: false,
    default: true
  },
  
  // Document References
  documentos: {
    fotoCarnet: String,
    pasaporteEscaneado: String,
    billeteSalida: String,
    reservaHotel: String
  },
  
  // Application Status
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  },
  
  // Timestamps
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: Date
});

// Use existing model if it exists, otherwise create a new one
const ThailandApplication = mongoose.models.ThailandApplication || mongoose.model('ThailandApplication', ThailandApplicationSchema);

export default ThailandApplication;