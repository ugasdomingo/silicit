//Import tools
import { Router } from 'express';
import { user_auth } from '../middlewares/user-auth';
import { admin_auth } from '../middlewares/admin-auth';
import {
    add_member_to_group,
    get_group_by_user_id,
    get_all_groups,
    edit_notes_by_group_id,
} from '../controllers/group-controllers';

//Router
const group_router = Router();

//Routes
group_router.post('/add-member', user_auth, add_member_to_group);

group_router.get('/user', user_auth, get_group_by_user_id);

group_router.get('/all', admin_auth, get_all_groups);

group_router.put('/edit-notes', admin_auth, edit_notes_by_group_id);

//Export
export default group_router;
