import { Request, Response } from "express";
import User from "../../entities/User";
import { GetAllUsersUseCase } from "../../use_cases/User/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "../../use_cases/User/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../../use_cases/User/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../use_cases/User/DeleteUserUseCase";
import { HashPasswordUseCase } from "../../use_cases/Auth/HashPasswordUseCase";
import { AuthenticateUserUseCase } from "../../use_cases/Auth/AuthenticateUserUseCase";

export class UserController {

  constructor(
    private hashPasswordUseCase: HashPasswordUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      await this.hashPasswordUseCase.execute(
        name,
        email,
        password,
      );

      return res.status(201).send();
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const token: string = await this.authenticateUserUseCase.execute({
        name,
        email,
        password,
      });

      return res.status(200).send(token);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const userList: User[] = await this.getAllUsersUseCase.execute();

      return res.status(200).send(userList);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const user = await this.getUserByIdUseCase.execute(id);

      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const id = Number(req.params.id);

      await this.updateUserUseCase.execute({
        name,
        email,
        password,
      }, id);

      return res.status(200).send({ message: 'User updated' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      await this.deleteUserUseCase.execute(id);

      return res.status(200).send({ message: 'User deleted' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
