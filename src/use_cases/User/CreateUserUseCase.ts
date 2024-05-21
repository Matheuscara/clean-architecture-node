import { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import User from "../../entities/User.js";
import { validate } from "class-validator";
import { ClassValidatorExceptionError } from "../../exceptions/ClassValidatorExceptionError.js";
import { CreateUserDTO } from "../../entities/dtos/CreateUserDTO.js";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<void> {

    const user = new User(
      data.name,
      data.email,
      data.password,
    );
    console.log(user, data)
    const errors = await validate(user);
    if (errors.length > 0) {
      const constraints = errors.map(e => e.constraints);
      const message = constraints.map((c: any) => Object.values(c)).join(', ');
      throw new ClassValidatorExceptionError(message, 400, 'Validation Error');
    }


    if (await this.userRepository.findByEmail(user.email)) {
      throw new Error("User already exists");
    }

    await this.userRepository.save(user);
  }
}
