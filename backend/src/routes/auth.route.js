//Tols Import ***************
import express from 'express';
import { login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { validateData } from '../middlewares/validationReqBody.js';

//Declare router
const router = express.Router();

//Routes ***************

router.post('/register', validateData, register);

router.post('/login',validateData, login);

router.get('/refresh', refreshToken);

router.get('/logout', logout);


export default router;