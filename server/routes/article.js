import { Router } from 'express';
import userAuth from '../middlewares/auth';

import {
  createMid,
  getAllMid,
  getIdMid,
  patchMid,
  deleteMid
} from '../middlewares/article';

const router = Router();

router.post('/', createMid);
router.get('/', userAuth, getAllMid);
router.get('/:id', getIdMid);
router.put('/:id', patchMid);
router.delete('/:id', deleteMid);

export default router;
