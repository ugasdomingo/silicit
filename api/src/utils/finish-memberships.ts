//Import tools
import { Membership_model, IMembership } from '../models/MembershipModel';
import { User_model } from '../models/UserModel';
import { internal_response } from './responses';

//Program functions to 00:00:00 every day
export const config = {
    runtime: 'nodejs',
    schedule: '0 0 * * *',
};

//Run finish_membership function
export const handler = async () => {
    try {
        //Get membership with membership_ended date before today
        const memberships: IMembership[] = await Membership_model.find({
            membership_ended: { $lt: new Date() },
            membership_status: 'active',
        });

        //Finish memberships
        memberships.forEach(async (membership: IMembership) => {
            //Update membership status
            await Membership_model.findByIdAndUpdate(membership._id, {
                membership_status: 'finished',
            });

            //Update user membership_id
            await User_model.findByIdAndUpdate(membership.user_id, {
                membership_id: null,
            });
        });

        return internal_response('Membresías finalizadas con éxito');
    } catch (error: any) {
        error.message
            ? internal_response(error.message, error)
            : internal_response(
                  'Error de servidor finalizando membresía',
                  error
              );
    }
};
