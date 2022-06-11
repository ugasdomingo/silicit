//Tools Import ********************
import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRoute from './routes/auth.route.js';

//Declare App ********************
const app = express();

//Middleware ********************
app.use(express.json());
app.use('/api/v1', authRoute);

//Default Port ********************
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
