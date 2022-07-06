import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export function generateToken(data: object, exp: string) : string {
    return jwt.sign(data, process.env.TOKEN_SECRET as jwt.Secret, {
        expiresIn: exp
    });
}

export function authenticateToken(token: string): any {
    return jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret, (err, payload) => {
        if (err){
            return null;
        }
        return payload;
    });
}