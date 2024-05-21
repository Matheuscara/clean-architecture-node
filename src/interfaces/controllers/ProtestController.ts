import { Request, Response } from "express";
import { CreateProtestUseCase } from "../../use_cases/Protest/CreateProtest";
import { GetAllProtestUseCase } from "../../use_cases/Protest/GetAllProtest";
import Protest from "../../entities/Protest";
import { GetProtestByIdUseCase } from "../../use_cases/Protest/GetProtestById";
import { UpdateProtestUseCase } from "../../use_cases/Protest/UpdateProtest";
import { DeleteProtestUseCase } from "../../use_cases/Protest/DeleteProtest";

export class ProtestController {

  constructor(
    private createProtestUseCase: CreateProtestUseCase,
    private getAllProtestUseCase: GetAllProtestUseCase,
    private getProtestByIdUseCase: GetProtestByIdUseCase,
    private updateProtestUseCase: UpdateProtestUseCase,
    private deleteProtestUseCase: DeleteProtestUseCase,
  ) {}

  async createProtest(req: Request, res: Response): Promise<Response> {
    const { amount, registrationDate, description, userId } = req.body;

    try {
      await this.createProtestUseCase.execute({
        amount,
        registrationDate,
        description,
        userId,
      });

      return res.status(201).send();
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getAllProtestes(req: Request, res: Response): Promise<Response> {
    try {
      const protestList: Protest[] = await this.getAllProtestUseCase.execute();

      return res.status(201).send(protestList);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getByIdProtestes(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const protest = await this.getProtestByIdUseCase.execute(id);

      return res.status(200).send(protest);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async updateProtest(req: Request, res: Response): Promise<Response> {
    try {
      const { amount, registrationDate, description, userId } = req.body;
      const id = Number(req.params.id);

      await this.updateProtestUseCase.execute({
        amount,
        registrationDate,
        description,
        userId,
      }, id);

      return res.status(200).send({ message: 'Protest updated' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteProtest(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      await this.deleteProtestUseCase.execute(id);

      return res.status(200).send({ message: 'Protest updated' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
