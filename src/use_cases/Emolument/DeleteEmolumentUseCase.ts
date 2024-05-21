import { NotFoundError } from "../../exceptions/NotFoundError.js";
import { IEmolumentRepository } from "../../interfaces/repositories/IEmolumentRepository.js";
import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository.js";

export class DeleteEmolumentUseCase {
  constructor(private emolumentRepository: IEmolumentRepository, private protestRepository: IProtestRepository) {}

  async execute(id: number): Promise<void>{
    const emolumentFind =  await this.emolumentRepository.findById(id);

    if (!emolumentFind) {
      throw new NotFoundError("Emolument not found");
    }

    await this.emolumentRepository.delete(id);
  }
}
