import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la categoría es requerido'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'El slug es requerido'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'La descripción no puede exceder los 200 caracteres']
  }
}, {
  timestamps: true
});

// Create slug from name before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Create index for search functionality
categorySchema.index({ name: 'text', description: 'text' });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category; 