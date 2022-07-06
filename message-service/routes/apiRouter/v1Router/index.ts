import { Request, Response } from "express";
import Router from 'express';
import { messageRouter } from './messageRouter';
import { authRouter } from './authRouter';
import { chatRoomRouter } from './chatRoomRouter';
import { memberRouter } from './memberRouter';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({status: "success", message: 'api/v1 is online'});
});

router.use('/messages', messageRouter);
router.use('/members', memberRouter);
router.use('/rooms', chatRoomRouter);
router.use('/auth', authRouter);

export const v1Router = router;
