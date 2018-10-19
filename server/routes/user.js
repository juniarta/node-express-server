import { Router } from 'express';
import {
  registerMid,
  loginMid,
  logoutMid,
  currentMid
} from '../middlewares/user';

const router = Router();

router.post('/register', registerMid);
router.post('/login', loginMid);
router.get('/logout', logoutMid);
router.get('/current', currentMid);

export default router;
