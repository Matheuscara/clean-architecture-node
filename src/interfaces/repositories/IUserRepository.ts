import User from "../../entities/User";

export interface IUserRepository {
  save(User: User): Promise<void>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User, id: number): Promise<void>;
  delete(id: number): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
