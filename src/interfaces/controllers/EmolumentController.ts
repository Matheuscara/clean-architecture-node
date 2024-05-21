import { Request, Response } from "express";
import { CreateEmolumentUseCase } from "../../use_cases/Emolument/CreateEmolumentUseCase";
import { CreateEmolumentDTO } from "../../entities/dtos/CreateEmolumentDTO";
import { GetAllEmolumentUseCase } from "../../use_cases/Emolument/GetAllEmolumentUseCase";
import Emolument from "../../entities/Emolument";
import { GetEmolumentByIdUseCase } from "../../use_cases/Emolument/GetEmolumentByIdUseCase";
import { UpdateEmolumentUseCase } from "../../use_cases/Emolument/UpdateEmolumentUseCase";
import { DeleteEmolumentUseCase } from "../../use_cases/Emolument/DeleteEmolumentUseCase";

export class EmolumentController {

  constructor(
    private createEmolumentUseCase: CreateEmolumentUseCase,
    private getAllEmolumentUseCase: GetAllEmolumentUseCase,
    private getEmolumentByIdUseCase: GetEmolumentByIdUseCase,
    private updateEmolumentUseCase: UpdateEmolumentUseCase,
    private deleteEmolumentUseCase: DeleteEmolumentUseCase,
  ) {}

  async createEmolument(req: Request, res: Response): Promise<Response> {
    const createEmolumentDTO : CreateEmolumentDTO = req.body;

    try {
      await this.createEmolumentUseCase.execute(createEmolumentDTO);

      return res.status(201).send();
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getAllEmoluments(req: Request, res: Response): Promise<Response> {
    try {
      const emolumentsList: Emolument[] = await this.getAllEmolumentUseCase.execute();

      return res.status(200).send(emolumentsList);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getByIdEmoluments(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const emolument = await this.getEmolumentByIdUseCase.execute(id);

      return res.status(200).send(emolument);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async updateEmolument(req: Request, res: Response): Promise<Response> {
    try {
      const createEmolumentDTO: CreateEmolumentDTO = req.body;
      const id = Number(req.params.id);

      await this.updateEmolumentUseCase.execute(id, createEmolumentDTO);

      return res.status(200).send({ message: 'Emolument updated' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteEmolument(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      await this.deleteEmolumentUseCase.execute(id);

      return res.status(200).send({ message: 'Emolument deleted' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
