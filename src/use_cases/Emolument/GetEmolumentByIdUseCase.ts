import Emolument from "../../entities/Emolument.js";
import { NotFoundError } from "../../exceptions/NotFoundError.js";
import { IEmolumentRepository } from "../../interfaces/repositories/IEmolumentRepository.js";

export class GetEmolumentByIdUseCase {
  constructor(private emolumentRepository: IEmolumentRepository) {}

  async execute(id: number): Promise<Emolument | null>{
    const emolument =  await this.emolumentRepository.findById(id);

    if (!emolument) {
      throw new NotFoundError("Emolument not found");
    }

    return emolument
  }
}
