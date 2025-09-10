import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ['admin'],
    default: ['admin']
  }
});

const User = mongoose.model('User', userSchema);

export default User;
