import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Basic user information from Google
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // Google profile image URL
  },
  
  // NextAuth.js compatibility fields
  emailVerified: {
    type: Date, // NextAuth.js uses this for email verification
  },
  
  // User status and metadata
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  
  // Role-based access (for future admin features)
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Add indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

// Add a method to update last login
UserSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Prevent duplicate model initialization
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
