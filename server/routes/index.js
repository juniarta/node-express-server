import { Router } from 'express';

import { authVerifyMid } from '../middlewares/auth';

import userRouter from './user';
import articleRouter from './article';

const router = Router();

router.use('/user', userRouter);
router.use('/article', authVerifyMid, articleRouter);

export default router;
