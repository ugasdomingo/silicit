//Import tools
import jwt from 'jsonwebtoken';
import { client_response, internal_response } from '../utils/responses';
import { User_model, IUser } from '../models/UserModel';

//Middleware
export const admin_auth = async (req: any, res: any, next: any) => {
    try {
        //Get token from headers
        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return client_response(res, 401, 'Inicia sesión para continuar');
        }

        //Verify token
        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if (!decoded) {
            return client_response(
                res,
                401,
                'Token no válido, autorización denegada'
            );
        }

        //Find user
        const user: IUser | null = await User_model.findById(decoded.uid);
        if (!user) {
            return client_response(res, 400, 'Usuario no registrado');
        }

        //Check if user is admin
        if (user.role !== 'Admin') {
            return client_response(
                res,
                401,
                'No tienes autorización para esta acción'
            );
        }

        //Add user to request
        req.uid = user._id;

        next();
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response(
                  'Error de servidor autenticando usuario',
                  error
              );
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};
