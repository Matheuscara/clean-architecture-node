import { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import User from "../../entities/User.js";
import { validate } from "class-validator";
import { ClassValidatorExceptionError } from "../../exceptions/ClassValidatorExceptionError.js";
import { CreateUserDTO } from "../../entities/dtos/CreateUserDTO.js";
import { NotFoundError } from "../../exceptions/NotFoundError.js";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO, id: number): Promise<void> {
    const userFind =  await this.userRepository.findById(id);

    if (!userFind) {
      throw new NotFoundError("User not found");
    }
    
    const user = new User(
      data.name,
      data.email,
      data.password,
    );

    const errors = await validate(user);
    if (errors.length > 0) {
      const constraints = errors.map(e => e.constraints);
      const message = constraints.map((c: any) => Object.values(c)).join(', ');
      throw new ClassValidatorExceptionError(message, 400, 'Validation Error');
    }

    await this.userRepository.update(user, id);
  }
}
