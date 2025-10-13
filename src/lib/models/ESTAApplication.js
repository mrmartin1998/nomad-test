import mongoose from 'mongoose';

// Define the schema
const ESTAApplicationSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: String,
    required: true,
    index: true
  },
  
  // Personal Information
  fullName: {
    type: String,
    required: true
  },
  nombreCompleto: String, // Spanish field name
  dateOfBirth: String,
  birthCity: String,
  birthCountry: String,
  nationality: String,
  
  // Contact Information
  email: {
    type: String,
    required: true
  },
  phone: String,
  telefono: String, // Spanish field name
  
  // Address Information
  address: String,
  usAddress: String,
  
  // Family Information
  fatherName: String,
  motherName: String,
  
  // Additional Information
  previousUsTravel: Boolean,
  hasCriminalRecord: Boolean,
  criminalRecordDetails: String,
  
  // Professional Information
  occupation: String,
  companyName: String,
  position: String,
  annualIncome: String,
  companyAddress: String,
  
  // Passport Information
  passportNumber: {
    type: String,
    required: true
  },
  numeroPasaporte: String, // Spanish field name
  passportIssueDate: String,
  passportExpiryDate: String,
  passportIssuingCountry: String,
  
  // Document References
  passportDocument: String,
  
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
const ESTAApplication = mongoose.models.ESTAApplication || mongoose.model('ESTAApplication', ESTAApplicationSchema);

export default ESTAApplication;