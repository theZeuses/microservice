import { NextFunction, Request, Response } from "express";
import { constructError, formatSuccess } from "@helpers/responseFormatter";
import { getChatRoomByUUID } from '@services/chatRoomService';
import { insertChatRoom } from '@services/chatRoomService';

export async function get(req: Request, res: Response){
    try {
        const result = await getChatRoomByUUID(req.params.uuid);
        return res.status(200).json(result);
    }catch(err){
        return constructError(res, err);
    }
}

export async function insert(req: Request, res: Response){
    try {
        const result = await insertChatRoom(req.body);
        return res.status(201).json(formatSuccess(result, 201));
    }catch(err){
        return constructError(res, err);
    }
}
