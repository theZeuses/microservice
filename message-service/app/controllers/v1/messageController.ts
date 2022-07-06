import { NextFunction, Request, Response } from "express";
import { constructError, formatSuccess } from "@helpers/responseFormatter";
import { insertMessage, getMessagesByFiltering } from '@services/messageService';

export async function getBatch(req: Request, res: Response){
    try {
        const { member, room } = req.query;
        if(!member || !room) throw { message: 'member and room must be in query string', code: 'INVALID_URL' }
        const result = await getMessagesByFiltering({
            room_uuid: room
        });
        return res.status(200).json(result);
    }catch(err){
        return constructError(res, err);
    }
}

export async function insert(req: Request, res: Response){
    try {
        const result = await insertMessage(req.body);
        return res.status(201).json(formatSuccess(result, 201));
    }catch(err){
        return constructError(res, err);
    }
}