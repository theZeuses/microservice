import { NextFunction, Request, Response } from "express";
import { constructError, formatSuccess } from "@helpers/responseFormatter";
import { login as loginService } from "@services/authService";

export async function login(req: Request, res: Response){
    try {
        if(!req.body.nickname || !req.body.password || !req.body.room_uuid){
            throw { message: "Credential Missing", statusCode: 400 };
        }
        const result = await loginService(req.body.room_uuid, req.body.nickname, req.body.password);
        return res.status(200).json(formatSuccess(result, 200));
    }catch(err){
        return constructError(res, err);
    }
}
