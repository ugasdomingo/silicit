//Tools Import ********************
import mongoose from 'mongoose';

//Connect to MongoDB ********************
try {
  await mongoose.connect(process.env.DB_CONNECTION);
  console.log('Connected to MongoDB');
}
catch (err) {
  console.log('Error connecting to MongoDB:', err.message);
}