//Import tools
import { Router } from 'express';
import { user_auth } from '../middlewares/user-auth';
import { admin_auth } from '../middlewares/admin-auth';
import {
    register,
    login,
    logout,
    refreshToken,
    forgot_password,
    change_password,
    get_users,
    get_user_by_group_id,
} from '../controllers/user-controllers';

//Router
const user_router = Router();

//Routes
user_router.post('/register', register);

user_router.post('/login', login);

user_router.post('/logout', user_auth, logout);

user_router.post('/refresh', refreshToken);

user_router.post('/forgot-password', forgot_password);

user_router.post('/change-password', user_auth, change_password);

user_router.get('/get-users', admin_auth, get_users);

user_router.get('/get-users-group/:group_id', admin_auth, get_user_by_group_id);

//Export
export default user_router;
