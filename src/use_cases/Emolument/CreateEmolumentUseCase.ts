import { validate } from "class-validator";
import { ClassValidatorExceptionError } from "../../exceptions/ClassValidatorExceptionError.js";
import Emolument from "../../entities/Emolument.js";
import { CreateEmolumentDTO } from "../../entities/dtos/CreateEmolumentDTO.js";
import { IEmolumentRepository } from "../../interfaces/repositories/IEmolumentRepository.js";
import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository.js";
import { NotFoundError } from "../../exceptions/NotFoundError.js";

export class CreateEmolumentUseCase {
  constructor(private emolumentRepository: IEmolumentRepository, private protestRepository: IProtestRepository) {}

  async execute(data: CreateEmolumentDTO): Promise<void> {


    const protest = await this.protestRepository.findById(data.idProtest);

    if (!protest || !data.idProtest) {
      throw new NotFoundError("Protest not found");
    }

    const emolumentValue = this.emolumentRepository.calculateEmolument(protest.amount);

    const emolument = new Emolument(
      emolumentValue,
      data.description,
      protest
    );

    const errors = await validate(emolument);
    if (errors.length > 0) {
      const constraints = errors.map(e => e.constraints);
      const message = constraints.map((c: any) => Object.values(c)).join(', ');
      throw new ClassValidatorExceptionError(message, 400, 'Validation Error');
    }

    await this.emolumentRepository.save(emolument);
  }
}
