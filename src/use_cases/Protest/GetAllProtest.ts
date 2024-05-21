import Protest from "../../entities/Protest.js";
import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository.js";

export class GetAllProtestUseCase {
  constructor(private protestRepository: IProtestRepository) {}

  async execute(): Promise<Protest[]>{
    return await this.protestRepository.findAll();
  }
}
