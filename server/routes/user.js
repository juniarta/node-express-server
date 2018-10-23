import { Router } from 'express';
import { registerMid, currentMid, allMid } from '../middlewares/user';
import { authVerifyMid } from '../middlewares/auth';

const router = Router();

router.post('/register', registerMid);
router.get('/current', currentMid);
router.get('/all', authVerifyMid, allMid);

export default router;
