//Import tools
import { Schema, model, Document } from 'mongoose';

//Interfaces
export interface IGoal extends Document {
    _id: Schema.Types.ObjectId;
    goal_name: string;
    goal_code: string;
    points: number;
    createdAt: Date;
    editedAt: Date;
}

//Schema
const goalSchema = new Schema<IGoal>(
    {
        goal_name: {
            type: String,
            required: true,
        },
        goal_code: {
            type: String,
            required: true,
            unique: true,
        },
        points: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export
export const Goal_model = model<IGoal>('Goal', goalSchema);
