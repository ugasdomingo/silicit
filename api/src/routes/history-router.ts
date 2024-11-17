//Import tools
import { Router } from 'express';
import { user_auth } from '../middlewares/user-auth';
import { admin_auth } from '../middlewares/admin-auth';
import {
    add_goal_completed,
    add_points,
    get_history,
} from '../controllers/history-controllers';

//Create router
const history_router = Router();

//Routes
history_router.post('/goal-completed', user_auth, add_goal_completed);

history_router.post('/add-points', user_auth, add_points);

history_router.post('/get-history', admin_auth, get_history);

//Export
export default history_router;
