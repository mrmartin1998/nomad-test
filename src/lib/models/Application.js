import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Personal Information
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  numeroPasaporte: { type: String, required: true },
  
  // Professional Information
  tipoEmpleo: { type: String, required: true },
  ingresosMensuales: { type: Number, required: true },
  
  // Document Upload (we'll store the file URL)
  documentos: [{
    tipo: String,
    url: String
  }],
  
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
const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

export default Application; 