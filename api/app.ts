//Import tools
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//Import routes
import user_router from './src/routes/user-router';
import history_router from './src/routes/history-router';
import membership_router from './src/routes/membership-router';
import goal_router from './src/routes/goal-router';
import group_router from './src/routes/group-router';

//Initialization
const app = express();

const allowedOrigins = [
    process.env.ORIGIN1 as string,
    process.env.ORIGIN2 as string,
];

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(
    cors({
        origin: function (origin: any, callback: any) {
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                'Error CORS, origin: ' + origin + ', No autorizado'
            );
        },
        credentials: true,
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/v1/auth', user_router);
app.use('/api/v1/history', history_router);
app.use('/api/v1/membership', membership_router);
app.use('/api/v1/goal', goal_router);
app.use('/api/v1/group', group_router);

//Export the app
export default app;
