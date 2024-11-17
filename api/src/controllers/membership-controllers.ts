//Import tools
import { client_response, internal_response } from '../utils/responses';

//Import Models
import { User_model, IUser } from '../models/UserModel';
import { Membership_model, IMembership } from '../models/MembershipModel';
import { History_model } from '../models/HistoryModel';
import { Goal_model, IGoal } from '../models/GoalModel';

//Controller List

export const renew_membership = async (req: any, res: any) => {
    try {
        //Find user
        const user: IUser | null = await User_model.findById(req.uid);
        if (!user) {
            return client_response(res, 400, 'Usuario no encontrado');
        }

        //Calculate data
        const started = new Date();
        const ended = new Date(started);

        //Create new membership
        const membership: IMembership = new Membership_model({
            user_id: user._id,
            membership_started: started,
            membership_ended: ended.setDate(ended.getDate() + 365),
            membership_type: 'Be Professional',
        });

        //Save membership
        await membership.save();

        //Update user membership_id
        await User_model.findByIdAndUpdate(user._id, {
            membership_id: membership._id,
        });

        //Add goal to user history
        const goal: IGoal | null = await Goal_model.findOne({
            goal_code: 'be_professional',
        });
        if (goal) {
            await History_model.findByIdAndUpdate(user.history_id, {
                $push: {
                    goals_achieved: goal._id,
                    points_won: { reason: goal.goal_name, points: goal.points },
                },
                $inc: { acumulated_points: goal.points },
            });
        }

        return client_response(res, 200, 'Membresía renovada con éxito');
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response('Error de servidor renovando membresía', error);
        client_response(res, 500, 'Error de servidor, intente más tarde');
    }
};
