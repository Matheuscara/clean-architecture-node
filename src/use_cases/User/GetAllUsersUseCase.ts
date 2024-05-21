import User from "../../entities/User.js";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
