import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "focusflow_secret";

export interface AuthRequest extends Request {

    user?: {

        id: number;

    };

}

export function authenticateToken(

    req: AuthRequest,

    res: Response,

    next: NextFunction

) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: "No token provided"
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            SECRET
        ) as { id: number };

        req.user = {
            id: decoded.id
        };

        next();

    }

    catch {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

}