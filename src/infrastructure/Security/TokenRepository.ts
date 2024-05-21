import jwt from "jsonwebtoken";
import User from "../../entities/User";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { ITokenRepository } from "../../interfaces/repositories/ITokenRepository";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "";

export class TokenRepository implements ITokenRepository {

  public generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
  }

  public verifyToken(token: string): any {
    return jwt.verify(token, secretKey);
  }


  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);;
  }

  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

}
