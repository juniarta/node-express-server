import { Router } from 'express';
import { loginMid, logoutMid } from '../middlewares/auth';

const router = Router();

router.post('/login', loginMid);
router.get('/logout', logoutMid);

export default router;
