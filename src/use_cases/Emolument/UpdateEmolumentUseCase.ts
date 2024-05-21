import { validate } from "class-validator";
import Emolument from "../../entities/Emolument.js";
import { CreateEmolumentDTO } from "../../entities/dtos/CreateEmolumentDTO.js";
import { NotFoundError } from "../../exceptions/NotFoundError.js";
import { IEmolumentRepository } from "../../interfaces/repositories/IEmolumentRepository.js";
import { ClassValidatorExceptionError } from "../../exceptions/ClassValidatorExceptionError.js";
import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository.js";

export class UpdateEmolumentUseCase {
  constructor(private emolumentRepository: IEmolumentRepository, private protestRepository: IProtestRepository) {}

  async execute(id: number, data: CreateEmolumentDTO): Promise<void>{
    const emolumentFind =  await this.emolumentRepository.findById(id);

    if (!emolumentFind) {
      throw new NotFoundError("Emolument not found");
    }

    const protestFind =  await this.protestRepository.findById(data.idProtest);

    if (!protestFind) {
      throw new NotFoundError("Protest not found");
    }

    const emolument = new Emolument(
      data.amount,
      data.description,
      protestFind
    )

    const errors = await validate(emolument);
    if (errors.length > 0) {
      const constraints = errors.map(e => e.constraints);
      const message = constraints.map((c: any) => Object.values(c)).join(', ');
      throw new ClassValidatorExceptionError(message, 400, 'Validation Error');
    }

    await this.emolumentRepository.update(emolument, id);
  }
}
