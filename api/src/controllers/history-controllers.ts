//Import tools
import { client_response, internal_response } from '../utils/responses';

//Import Models
import { User_model, IUser } from '../models/UserModel';
import { Goal_model, IGoal } from '../models/GoalModel';
import { History_model, IHistory } from '../models/HistoryModel';

//Controller List

export const add_goal_completed = async (req: any, res: any) => {
    try {
        const { goal_code } = req.body;

        //Check if user exists
        const user: IUser | null = await User_model.findById(req.uid);
        if (!user) {
            return client_response(res, 400, 'Usuario no encontrado');
        }

        //Check if goal exists
        const goal: IGoal | null = await Goal_model.findOne({ goal_code });
        if (!goal) {
            return client_response(res, 400, 'Meta no encontrada');
        }

        //Check if goal is already completed
        if (user.history_id) {
            const history: IHistory | null = await History_model.findById(
                user.history_id
            );
            if (history) {
                if (history.goals_achieved.includes(goal._id)) {
                    return client_response(res, 400, 'Meta ya completada');
                }
            }
        }

        //Add goal to user history and plus points
        if (user.history_id) {
            await History_model.findByIdAndUpdate(user.history_id, {
                $push: {
                    goals_achieved: goal._id,
                    points_won: { reason: goal.goal_name, points: goal.points },
                },
                $inc: { acumulated_points: goal.points },
            });
        }

        client_response(res, 200, 'Meta completada con éxito');
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor aprobando meta', error);
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};

export const add_points = async (req: any, res: any) => {
    try {
        const { reason, points } = req.body;

        //Check if user exists
        const user: IUser | null = await User_model.findById(req.uid);
        if (!user) {
            return client_response(res, 400, 'Usuario no encontrado');
        }

        //Add points to user history
        if (user.history_id) {
            await History_model.findByIdAndUpdate(user.history_id, {
                $push: { points_won: { reason, points } },
                $inc: { acumulated_points: points },
            });
        }

        return client_response(res, 200, 'Puntos añadidos con éxito');
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor añadiendo puntos', error);
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};

//Admin controllers
export const get_history = async (req: any, res: any) => {
    try {
        const { history_id } = req.body;

        //Check if user exists
        const user: IUser | null = await User_model.findOne({ history_id });

        if (!user) {
            return client_response(res, 400, 'Usuario no encontrado');
        }

        //Get user history
        const history: IHistory | null = await History_model.findById(
            history_id
        );

        return client_response(res, 200, 'Realizado', history);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response(
                  'Error de servidor obteniendo historial',
                  error
              );
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};
