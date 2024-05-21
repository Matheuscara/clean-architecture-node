import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository.js";
import { CreateProtestDTO } from "../../entities/dtos/CreateProtestDTO.js";
import Protest from "../../entities/Protest.js";
import { validate } from "class-validator";
import { ClassValidatorExceptionError } from "../../exceptions/ClassValidatorExceptionError.js";

export class UpdateProtestUseCase {
  constructor(private protestRepository: IProtestRepository) {}

  async execute(data: CreateProtestDTO, id: number): Promise<void> {
    const protest = new Protest(
      data.amount,
      data.registrationDate,
      data.description,
      data.userId,
    );

    const errors = await validate(protest);
    if (errors.length > 0) {
      const constraints = errors.map(e => e.constraints);
      const message = constraints.map((c: any) => Object.values(c)).join(', ');
      throw new ClassValidatorExceptionError(message, 400, 'Validation Error');
    }

    await this.protestRepository.update(protest, id);
  }
}
