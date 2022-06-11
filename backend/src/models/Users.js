//Tools Import ***************
import {Schema, model} from 'mongoose';

// Create schemas ***************
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  subscription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export const User = model('User', userSchema);