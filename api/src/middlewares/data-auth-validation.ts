//Import tools
import { body } from 'express-validator';
import { error_auth_validation } from '../middlewares/error-auth-validation';

//Define validations
export const data_auth_validation = [
    body('email').trim().isEmail().withMessage('Email inválido'),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Contraseña debe tener al menos 8 caracteres'),
    error_auth_validation,
];
