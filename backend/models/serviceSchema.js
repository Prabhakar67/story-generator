import mongoose from 'mongoose';

const serviceEntrySchema = new mongoose.Schema({
  // customerName removed for admin-only app

  customerName: {
    type: String,
    required: true,
    trim: true
  },
  bikeModel: {
    type: String,
    required: true,
    trim: true
  },
  bikeNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  serviceDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
serviceEntrySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const ServiceEntry = mongoose.model('ServiceEntry', serviceEntrySchema);

export default ServiceEntry;

