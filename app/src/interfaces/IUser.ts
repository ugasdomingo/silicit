export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    membership_id: string;
    history_id: string;
    policy_accepted: boolean;
    reset_token: string;
    createdAt: Date;
    editedAt: Date;
}
