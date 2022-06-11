//Tols Import ***************
import {Schema, model} from 'mongoose';

// Create schemas ***************
const visitorSchema = new Schema({
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
  }
});


export const Visitor = model('Visitor', visitorSchema);