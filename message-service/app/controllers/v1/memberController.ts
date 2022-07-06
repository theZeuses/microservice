import { NextFunction, Request, Response } from "express";
import { constructError, formatSuccess } from "@helpers/responseFormatter";
import { getMemberByUUID } from '@services/memberService';
import { insertMember } from '@services/memberService';

export async function get(req: Request, res: Response){
    try {
        const result = await getMemberByUUID(req.params.uuid);
        return res.status(200).json(result);
    }catch(err){
        return constructError(res, err);
    }
}

export async function insert(req: Request, res: Response){
    try {
        const result = await insertMember(req.body);
        return res.status(201).json(formatSuccess(result, 201));
    }catch(err){
        return constructError(res, err);
    }
}