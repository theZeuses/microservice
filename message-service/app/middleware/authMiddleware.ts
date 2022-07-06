import { authenticateToken } from "@app/helpers/jwtHelper";
import { NextFunction, Request, Response } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    next();
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    // if (!token) return res.sendStatus(401);

    // const payload = authenticateToken(token);
    // if(!payload) return res.sendStatus(403);
    // req.auth_data = payload;
    // next();
}