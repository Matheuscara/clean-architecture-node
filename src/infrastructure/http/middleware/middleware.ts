import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../../entities/User";

const secretKey = process.env.SECRET_KEY || "";

interface JwtPayload {
  id: number;
  email: string;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
