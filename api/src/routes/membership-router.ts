//Import tools
import { Router } from 'express';
import { user_auth } from '../middlewares/user-auth';
import { renew_membership } from '../controllers/membership-controllers';

//Router
const membership_router = Router();

//Routes
membership_router.post('/renew', user_auth, renew_membership);

//Export
export default membership_router;
