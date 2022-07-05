//Tols Import ***************
import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const ahorrosSchema = new Schema({
  monto: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  comprobante: {
    data: Buffer,
    contentType: String
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


export const Ahorros = model('Ahorro', ahorrosSchema);