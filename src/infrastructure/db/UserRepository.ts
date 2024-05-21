import { Database } from "./Database";
import { Repository } from "typeorm";
import User from "../../entities/User";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  private db: Database;
  private userRepository: Repository<User>;

  constructor(db: Database) {
    this.db = db;
    this.userRepository = this.db.dataSource.getRepository(User);
  }

  async save(user: User): Promise<void> {
    const userEntity = this.userRepository.create(user);
    await this.userRepository.save(userEntity);
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async update(user: User, id: number): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
