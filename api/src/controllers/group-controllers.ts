//Import tools
import { client_response, internal_response } from '../utils/responses';

//Import models
import { Group_model, IGroup } from '../models/GroupModel';
import { User_model, IUser } from '../models/UserModel';
import { History_model, IHistory } from '../models/HistoryModel';
import { Goal_model, IGoal } from '../models/GoalModel';

//Controller List

//Helper functions
const add_goal_completed = async (goal_code: string, uid: string) => {
    try {
        //Check if goal exists
        const goal: IGoal | null = await Goal_model.findOne({ goal_code });
        if (!goal) {
            throw new Error('Meta no encontrada');
        }

        //Check if goal is already completed
        const user: IUser | null = await User_model.findById(uid);
        if (user?.history_id) {
            const history: IHistory | null = await History_model.findById(
                user.history_id
            );
            if (history) {
                if (history.goals_achieved.includes(goal._id)) {
                    return 'Meta ya completada';
                } else {
                    //Add goal to user history and plus points
                    await History_model.findByIdAndUpdate(user.history_id, {
                        $push: {
                            goals_achieved: goal._id,
                            points_won: {
                                reason: goal.goal_name,
                                points: goal.points,
                            },
                        },
                        $inc: { acumulated_points: goal.points },
                    });

                    return 'Meta completada con éxito';
                }
            }

            throw new Error('Historial no encontrado');
        }
        throw new Error('Usuario no encontrado');
    } catch (error: any) {
        throw new Error(error);
    }
};

export const add_member_to_group = async (req: any, res: any) => {
    try {
        //Find all groups number
        const groups: IGroup[] = await Group_model.find();

        //Check if user is already in a group
        const user_group: IGroup | null = await Group_model.findOne({
            members: req.uid,
        });

        if (user_group) {
            return client_response(res, 200, 'Usuario ya está en un grupo');
        }

        //Pick the last group in groups
        const groups_number = groups.length;
        const last_group: IGroup | null = groups[groups_number - 1];
        console.log(last_group);

        if (last_group.members.length < 4) {
            //Add member to group
            const user_group = await Group_model.findByIdAndUpdate(
                last_group._id,
                {
                    $push: {
                        members: req.uid,
                    },
                }
            );
            await add_goal_completed('join_platzi_group', req.uid);
            return client_response(
                res,
                200,
                'Usuario agregado al grupo con éxito',
                user_group
            );
        } else {
            //Create new group
            const new_group = new Group_model({
                number: last_group.number + 1,
                members: [req.uid],
            });
            const user_group = await new_group.save();
            await add_goal_completed('join_platzi_group', req.uid);
            return client_response(
                res,
                200,
                'Usuario agregado al grupo con éxito',
                user_group
            );
        }
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor creando grupo', error);
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};

export const get_group_by_user_id = async (req: any, res: any) => {
    try {
        const group: IGroup | null = await Group_model.findOne({
            members: req.uid,
        });
        return client_response(res, 200, 'Grupo encontrado', group);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor buscando grupo', error);
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};

export const get_all_groups = async (req: any, res: any) => {
    try {
        const groups: IGroup[] = await Group_model.find();
        return client_response(res, 200, 'Grupos encontrados', groups);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor buscando grupos', error);
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};

//Admin controllers
export const edit_notes_by_group_id = async (req: any, res: any) => {
    try {
        const { group_id, notes } = req.body;

        //Edit notes
        const group: IGroup | null = await Group_model.findByIdAndUpdate(
            group_id,
            {
                notes,
            }
        );

        return client_response(res, 200, 'Notas editadas con éxito', group);
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor editando notas', error);
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};
