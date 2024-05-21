import { response } from "express";
import Protest from "../../entities/Protest.js";
import { NotFoundError } from "../../exceptions/NotFoundError.js";
import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository.js";

export class GetProtestByIdUseCase {
  constructor(private protestRepository: IProtestRepository) {}

  async execute(id: number): Promise<Protest> {
    const protest: Protest | null = await this.protestRepository.findById(id);

    if (!protest) {
      throw new NotFoundError("Protest not found");
    }

    return protest
  }
}
