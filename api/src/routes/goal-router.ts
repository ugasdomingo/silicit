//Import tools
import { Router } from 'express';
import { admin_auth } from '../middlewares/admin-auth';
import { user_auth } from '../middlewares/user-auth';
import {
    create_goal,
    get_goals,
    delete_goal,
    update_goal,
} from '../controllers/goal-controllers';

//Router
const goal_router = Router();

//Routes
goal_router.post('/', create_goal);

goal_router.get('/', user_auth, get_goals);

goal_router.put('/', admin_auth, update_goal);

goal_router.delete('/', admin_auth, delete_goal);

//Export
export default goal_router;
