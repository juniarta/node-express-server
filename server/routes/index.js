import { Router } from 'express';

import userRouter from './user';
import articleRouter from './article';
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/article', articleRouter);

export default router;
