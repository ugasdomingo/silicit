//Import tools
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { internal_response } from '../utils/responses';

//Interface
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    membership_id: Schema.Types.ObjectId;
    history_id: Schema.Types.ObjectId;
    policy_accepted: boolean;
    reset_token: string;
    createdAt: Date;
    editedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

//Schema
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'member',
            allowedValues: ['Admin', 'member', 'inactive'],
        },
        membership_id: {
            type: Schema.Types.ObjectId,
            ref: 'Membership',
        },
        history_id: {
            type: Schema.Types.ObjectId,
            ref: 'History',
        },
        policy_accepted: {
            type: Boolean,
            required: true,
        },
        reset_token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//Encrypt password
userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        internal_response('Error de servidor encriptando contraseña', error);
    }
});

//Compare password
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

//Change password
userSchema.methods.changePassword = async function (
    oldPassword: string,
    newPassword: string
): Promise<void> {
    try {
        if (!(await this.comparePassword(oldPassword))) {
            throw new Error('Invalid password');
        }
        this.password = newPassword;
        await this.save();
    } catch (error) {
        internal_response('Error de servidor cambiando contraseña', error);
    }
};

//Export model
export const User_model = model<IUser>('User', userSchema);
