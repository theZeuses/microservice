import Router from 'express';
import { get, insert } from '@controllers/v1/chatRoomController';
import { authenticate } from '@app/middleware/authMiddleware';
const router = Router();

router.get('/', authenticate, get);
router.post('/', authenticate, insert);

export const chatRoomRouter = router;