import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository.js";

export class DeleteProtestUseCase {
  constructor(private protestRepository: IProtestRepository) {}

  async execute(id: number): Promise<void>{
    await this.protestRepository.delete(id);
  }
}
