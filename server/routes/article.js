import { Router } from 'express';
import {
  createMid,
  getAllMid,
  getIdMid,
  patchMid,
  deleteMid
} from '../middlewares/article';

const router = Router();

router.post('/', createMid);
router.get('/', getAllMid);
router.get('/:id', getIdMid);
router.put('/:id', patchMid);
router.delete('/:id', deleteMid);

export default router;
