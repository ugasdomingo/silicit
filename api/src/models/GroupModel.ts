//Import tools
import { Schema, model, Document } from 'mongoose';

//Interface
export interface IGroup extends Document {
    _id: string;
    number: number;
    members: Schema.Types.ObjectId[];
    status: string;
    notes: string;
    createdAt: Date;
    editedAt: Date;
}

//Schema
const groupSchema = new Schema<IGroup>(
    {
        number: {
            type: Number,
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        status: {
            type: String,
            default: 'incomplete',
            allowedValues: [
                'incomplete',
                'complete',
                'pending',
                'studing',
                'ended',
            ],
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//Export model
export const Group_model = model<IGroup>('Group', groupSchema);
