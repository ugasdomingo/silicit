//Import tools
import { Schema, model, Document } from 'mongoose';

export interface IHistory extends Document {
    _id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    acumulated_points: number;
    points_won: object[];
    goals_achieved: Schema.Types.ObjectId[];
    createdAt: Date;
    editedAt: Date;
}

//Schema
const historySchema = new Schema<IHistory>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        acumulated_points: {
            type: Number,
            default: 0,
        },
        points_won: [
            {
                reason: {
                    type: String,
                },
                points: {
                    type: Number,
                },
            },
        ],
        goals_achieved: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Goal',
            },
        ],
    },
    {
        timestamps: true,
    }
);

//Export
export const History_model = model<IHistory>('History', historySchema);
