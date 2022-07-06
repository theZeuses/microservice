import Router from 'express';
import { getBatch, insert } from '@controllers/v1/messageController';
import { authenticate } from '@app/middleware/authMiddleware';
const router = Router();

router.get('/', authenticate, getBatch);
router.post('/', authenticate, insert);

export const messageRouter = router;