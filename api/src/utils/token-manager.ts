//Import tools
import jwt from 'jsonwebtoken';

//Create token
export const create_token = (uid: string): string => {
    return jwt.sign({ uid }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
};

//Create refresh token
export const create_refreshToken = (uid: string): string => {
    return jwt.sign({ uid }, process.env.JWT_REFRESH as string, {
        expiresIn: '30d',
    });
};
