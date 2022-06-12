//Tols Import ***************
import express from 'express';
import { body } from 'express-validator';
import { login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { validateReqBody } from '../middlewares/validationReqBody.js';

//Declare router
const router = express.Router();

//Register *****************
router.post('/register',[
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is not valid')
    ,
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    ,
], validateReqBody, register);

//Login ****************
router.post('/login',[
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is not valid')
    ,
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    ,
], validateReqBody, login);


//Refresh Token ****************
router.get('/refresh', refreshToken);


//Logout ****************
router.get('/logout', logout);



export default router;