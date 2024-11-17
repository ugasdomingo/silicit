//Import tools
import { Schema, model, Document } from 'mongoose';

//Interface
export interface IMembership extends Document {
    _id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    membership_started: Date;
    membership_ended: Date;
    membership_type: string;
    membership_status: string;
    createdAt: Date;
    editedAt: Date;
}

//Schema
const membershipSchema = new Schema<IMembership>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        membership_started: {
            type: Date,
            required: true,
        },
        membership_ended: {
            type: Date,
            required: true,
        },
        membership_type: {
            type: String,
            required: true,
        },
        membership_status: {
            type: String,
            default: 'active',
            allowedValues: ['active', 'finished'],
        },
    },
    {
        timestamps: true,
    }
);

//Export
export const Membership_model = model<IMembership>(
    'Membership',
    membershipSchema
);
