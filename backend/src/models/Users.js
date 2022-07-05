//Tools Import ***************
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcryptjs from 'bcryptjs';


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

//Hash the password before saving
userSchema.pre('save', function(next) {
  const user = this;
  
  if (!user.isModified('password')) return next();
  
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function(clientPassword) {
  return bcryptjs.compareSync(clientPassword, this.password);
};


export const User = model('User', userSchema);