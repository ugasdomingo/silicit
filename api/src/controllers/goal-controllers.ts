//Import tools
import { Goal_model, IGoal } from '../models/GoalModel';
import { client_response, internal_response } from '../utils/responses';

//Controller List

export const create_goal = async (req: any, res: any) => {
    try {
        const { goal_name, goal_code, points } = req.body;

        //Check if goal already exists
        const goal = await Goal_model.findOne({ goal_code });

        if (goal) {
            return client_response(
                res,
                400,
                'Ya existe una meta con este código'
            );
        }

        //Create new goal
        const new_goal: IGoal = new Goal_model({
            goal_name,
            goal_code,
            points,
        });

        //Save goal
        await new_goal.save();

        //Response
        return client_response(res, 200, 'Meta creada correctamente', new_goal);
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

export const get_goals = async (req: any, res: any) => {
    try {
        const goals = await Goal_model.find();

        return client_response(res, 200, 'Metas encontradas', goals);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor encontrando metas', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const update_goal = async (req: any, res: any) => {
    try {
        const { goal_id, goal_name, goal_code, points } = req.body;

        //Check if goal exists
        const goal = await Goal_model.findById(goal_id);

        if (!goal) {
            return client_response(res, 400, 'Meta no encontrada');
        }

        //Update goal
        goal.goal_name = goal_name;
        goal.goal_code = goal_code;
        goal.points = points;

        //Save goal
        await goal.save();

        //Response
        return client_response(
            res,
            200,
            'Meta actualizada correctamente',
            goal
        );
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor actualizando meta', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};

export const delete_goal = async (req: any, res: any) => {
    try {
        const { goal_id } = req.body;

        //Check if goal exists
        const goal = await Goal_model.findByIdAndDelete(goal_id);

        if (!goal) {
            return client_response(res, 400, 'Meta no encontrada');
        }

        //Response
        return client_response(res, 200, 'Meta eliminada correctamente');
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor eliminando meta', error);
        client_response(
            res,
            500,
            'Error de servidor, por favor intenta más tarde'
        );
    }
};
