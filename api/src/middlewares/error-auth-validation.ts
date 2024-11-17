//Import tools
import { validationResult } from 'express-validator';
import { client_response } from '../utils/responses';

//Define validations
export const error_auth_validation = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return client_response(res, 400, 'Error de validación', errors.array());
    }
    next();
};
