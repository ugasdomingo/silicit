export interface IHistory {
    _id: string;
    user_id: string;
    acumulated_points: number;
    points_won: PointWon[];
    goals_achieved: string[];
    createdAt: Date;
    editedAt: Date;
}

export interface PointWon {
    _id: string;
    reason: string;
    points: number;
}
