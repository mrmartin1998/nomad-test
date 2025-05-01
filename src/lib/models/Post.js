import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede exceder los 200 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El contenido es requerido']
  },
  author: {
    type: String,
    required: [true, 'El autor es requerido'],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es requerida']
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'El slug es requerido'],
    trim: true
  },
  meta_description: {
    type: String,
    trim: true,
    maxlength: [160, 'La descripción meta no puede exceder los 160 caracteres']
  }
}, {
  timestamps: true
});

// Create slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Create index for search functionality
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post; 