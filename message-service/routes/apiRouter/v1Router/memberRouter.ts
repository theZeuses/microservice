import Router from 'express';
import { get, insert } from '@controllers/v1/memberController';
import { authenticate } from '@app/middleware/authMiddleware';
const router = Router();

router.get('/:uuid', authenticate, get);
router.post('/', authenticate, insert);

export const memberRouter = router;