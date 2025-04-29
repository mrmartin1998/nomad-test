import mongoose from 'mongoose';

const UKApplicationSchema = new mongoose.Schema({
  // Personal Information
  nombreCompleto: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  lugarNacimiento: { type: String, required: true },
  nacionalidad: { type: String, required: true },

  // Contact Information
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  direccionResidencia: { type: String, required: true },

  // Passport Details
  numeroPasaporte: { type: String, required: true },
  fechaEmisionPasaporte: { type: Date, required: true },
  fechaExpiracionPasaporte: { type: Date, required: true },

  // Documents (we'll store the file URLs)
  documentos: {
    fotoCarnet: { type: String },
    pasaporteEscaneado: { type: String }
  },

  // Security & Legal
  antecedentesPenales: { type: Boolean, required: true },
  rechazosMigratorios: { type: Boolean, required: true },
  consentimientoDatos: { type: Boolean, required: true },

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
const UKApplication = mongoose.models.UKApplication || mongoose.model('UKApplication', UKApplicationSchema);

export default UKApplication; 