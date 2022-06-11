//Tols Import ***************
import express from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';
import { validateReqBody } from '../middlewares/validationReqBody.js';

//Declare router
const router = express.Router();

//Routes
router.post('/register',[
  //Validate request
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

router.post('/login',[
  //Validate request
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


//Export router
export default router;