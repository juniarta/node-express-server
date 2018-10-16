import { Router } from 'express';
import { createMid, getAllMid, patchMid } from '../../middleware/article';

const router = Router();

router.post('/', createMid);
router.get('/', getAllMid);
router.patch('/:id', patchMid);

export default router;
