//Tols Import ***************
import mongoose from 'mongoose';
const { Schema, model } = mongoose


const becasSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  initalDate: {
    type: Date,
    required: true
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userMail: {
    type: String,
    required: true
  }
});


export const Becas = model('Beca', becasSchema);