import { validationResult } from "express-validator";
import { body } from 'express-validator';

export const validateReqBody = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400).json({ errors: errors
      .array().map(err => err.msg) })
    ;
  }

  next();
}

export const validateData = [
  
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
  validateReqBody
]