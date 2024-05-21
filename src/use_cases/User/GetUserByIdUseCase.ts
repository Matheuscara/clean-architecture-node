import User from "../../entities/User.js";
import { NotFoundError } from "../../exceptions/NotFoundError.js";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<User> {
    const user: User | null = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
