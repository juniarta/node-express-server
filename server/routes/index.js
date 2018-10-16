import { Router } from 'express';

import userRouter from './user';
import articleRouter from './article';

const router = Router();

router.use('/user', userRouter);
router.use('/article', articleRouter);

export default router;
