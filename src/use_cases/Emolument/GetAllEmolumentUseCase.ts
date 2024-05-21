import Emolument from "../../entities/Emolument.js";
import { IEmolumentRepository } from "../../interfaces/repositories/IEmolumentRepository.js";

export class GetAllEmolumentUseCase {
  constructor(private emolumentRepository: IEmolumentRepository) {}

  async execute(): Promise<Emolument[]>{
    return await this.emolumentRepository.findAll();
  }
}
