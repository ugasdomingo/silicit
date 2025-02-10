//Import tools
import jwt from 'jsonwebtoken';
import { send_email } from '../utils/mailer';
import { create_token, create_refreshToken } from '../utils/token-manager';
import {
    client_response,
    internal_response,
    set_cookies,
    remove_cookies,
} from '../utils/responses';

//Import Models
import { User_model, IUser } from '../models/UserModel';
import { Goal_model, IGoal } from '../models/GoalModel';
import { History_model, IHistory } from '../models/HistoryModel';
import { Membership_model, IMembership } from '../models/MembershipModel';
import { Group_model, IGroup } from '../models/GroupModel';

//Controller List

export const register = async (req: any, res: any) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            policy_accepted,
            membership_type,
        } = req.body;
        //Check if user already exists
        const user = await User_model.findOne({ email });

        if (user) {
            return client_response(
                res,
                400,
                'Ya existe una cuenta con este correo'
            );
        }

        //Create new user
        const new_user: IUser = new User_model({
            name,
            email,
            phone,
            password,
            policy_accepted,
        });

        //Create history
        const new_history: IHistory = new History_model({
            user_id: new_user._id,
        });
        new_user.history_id = new_history._id;

        //Calculate data
        const started = new Date();
        const ended = new Date(started);

        if (membership_type === 'Make money') {
            ended.setMonth(ended.getMonth() + 6);
            const goal: IGoal | null = await Goal_model.findOne({
                goal_code: 'make_money',
            });
            if (goal) {
                new_history.goals_achieved.push(goal._id);
                new_history.acumulated_points += goal.points;
                new_history.points_won.push({
                    reason: goal.goal_name,
                    points: goal.points,
                });
            } else {
                throw new Error('Error procesando la meta en la solicitud');
            }
        } else if (membership_type === 'Be professional') {
            ended.setDate(ended.getDate() + 365);
            const goal: IGoal | null = await Goal_model.findOne({
                goal_code: 'be_professional',
            });
            if (goal) {
                new_history.goals_achieved.push(goal._id);
                new_history.acumulated_points += goal.points;
                new_history.points_won.push({
                    reason: goal.goal_name,
                    points: goal.points,
                });
            } else {
                throw new Error('Error procesando la meta en la solicitud');
            }
        } else {
            ended.setDate(ended.getDate() + 365);
            const goal: IGoal | null = await Goal_model.findOne({
                goal_code: 'investor',
            });
            if (goal) {
                new_history.goals_achieved.push(goal._id);
                new_history.acumulated_points += goal.points;
                new_history.points_won.push({
                    reason: goal.goal_name,
                    points: goal.points,
                });
            } else {
                throw new Error('Error procesando la meta en la solicitud');
            }
        }

        //Create new membership
        const membership: IMembership = new Membership_model({
            user_id: new_user._id,
            membership_started: started,
            membership_ended: ended,
            membership_type,
        });

        new_user.membership_id = membership._id;

        //Save data
        await new_user.save();
        await new_history.save();
        await membership.save();

        //Create tokens
        const token = create_token(new_user._id.toString());
        const refreshToken = create_refreshToken(new_user._id.toString());

        //Set user data
        const user_data = {
            user_name: new_user.name,
            user_role: new_user.role,
            user_history: new_history,
            token,
        };

        //Set cookies
        set_cookies(res, refreshToken);

        //Inform with mail
        await send_email(
            'info@silicit.es',
            '¡Nuevo Registro!',
            `¡Se registró ${name}! \n\n Correo: ${email} \n\n Contacto: ${phone}`
        );

        //Response
        client_response(
            res,
            200,
            'Te has registrado correctamente, ¡felicitaciones!',
            user_data
        );
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor registrando usuario', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const user: IUser | null = await User_model.findOne({ email });

        if (!user) {
            return client_response(res, 400, 'Correo o contraseña incorrectos');
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return client_response(res, 400, 'Correo o contraseña incorrectos');
        }

        //Create tokens
        const token = create_token(user._id.toString());
        const refreshToken = create_refreshToken(user._id.toString());

        //Get user history
        const history: IHistory | null = await History_model.findById(
            user.history_id
        );

        //Set user data
        const user_data = {
            user_name: user.name,
            user_role: user.role,
            user_history: history,
            token,
        };

        //Set cookies
        set_cookies(res, refreshToken);

        client_response(res, 200, '¡Bienvenido de nuevo!', user_data);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor iniciando sesión', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const logout = async (req: any, res: any) => {
    try {
        //Remove cookies
        remove_cookies(res);

        client_response(res, 200, '¡Hasta pronto!');
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor cerrando sesión', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const refreshToken = async (req: any, res: any) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return client_response(res, 401, 'Inicia sesión para continuar');
        }

        //Verify token
        const { uid } = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH as string
        ) as { uid: string };

        //Check if user exists
        const user: IUser | null = await User_model.findById(uid);

        if (!user) {
            console.log('Usuario no encontrado');
            return client_response(res, 401, 'Usuario no autorizado');
        }

        //Create new token
        const new_token = create_token(uid);
        const new_refreshToken = create_refreshToken(uid);

        //Get user history
        const history: IHistory | null = await History_model.findById(
            user.history_id
        );

        //Set user data
        const user_data = {
            user_name: user.name,
            user_role: user.role,
            user_history: history,
            token: new_token,
        };

        //Set cookies
        set_cookies(res, new_refreshToken);

        client_response(res, 200, 'Realizado', user_data);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor refrescando token', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const forgot_password = async (req: any, res: any) => {
    try {
        const { email } = req.body;
        const user: IUser | null = await User_model.findOne({ email });

        if (!user) {
            return client_response(res, 400, 'Usuario no encontrado');
        }

        //Create a random reset token
        const reset_token = Math.random().toString(36).substring(2);

        //Update user data
        user.reset_token = reset_token;
        await user.save();

        //Send email
        await send_email(
            email,
            'Solicitud para recuperar contraseña',
            `Para recuperar tu contraseña, ingresa al siguiente link: ${process.env.CLIENT_URL}/reset-password/${reset_token}`
        );

        client_response(
            res,
            200,
            'Se ha enviado un correo para recuperar tu contraseña'
        );
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response(
                  'Error de servidor recuperando contraseña',
                  error
              );
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const change_password = async (req: any, res: any) => {
    try {
        const { new_password, reset_token } = req.body;
        console.log(reset_token);
        const user: IUser | null = await User_model.findOne({
            reset_token,
        });

        if (!user) {
            return client_response(res, 400, 'Usuario no encontrado');
        }

        await user.changePassword(new_password);

        client_response(res, 200, 'Contraseña cambiada correctamente');
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response(
                  'Error de servidor cambiando contraseña',
                  error
              );
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

//ADmin controllers
export const get_users = async (req: any, res: any) => {
    try {
        const users: IUser[] = await User_model.find();

        client_response(res, 200, 'Realizado', users);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor obteniendo usuarios', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const get_user_by_group_id = async (req: any, res: any) => {
    try {
        const { group_id } = req.params;
        const group: IGroup | null = await Group_model.findById(group_id);

        if (!group) {
            return client_response(res, 400, 'Grupo no encontrado');
        }

        const users: IUser[] = await User_model.find({
            _id: { $in: group.members },
        });

        client_response(res, 200, 'Realizado', users);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor obteniendo usuario', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};
