import { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
