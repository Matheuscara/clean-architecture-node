import User from "../../entities/User";

export interface ITokenRepository {
  generateToken(User: User): string;
  verifyToken(token: string): boolean;
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
}
