import { IEmolumentRepository } from "../../interfaces/repositories/IEmolumentRepository";
import { Database } from "./Database";
import { Repository } from "typeorm";
import Emolument from "../../entities/Emolument";
import { CreateEmolumentDTO } from "../../entities/dtos/CreateEmolumentDTO";

export class EmolumentRepository implements IEmolumentRepository {
  private db: Database;
  private emolumentRepository: Repository<Emolument>;

  constructor(db: Database) {
    this.db = db;
    this.emolumentRepository = this.db.dataSource.getRepository(Emolument);
  }

  async save(emolument: Emolument): Promise<void> {
    const emolumentEntity = this.emolumentRepository.create(emolument);
    await this.emolumentRepository.save(emolumentEntity);
  }

  async findById(id: number): Promise<Emolument | null> {
    return await this.emolumentRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<Emolument[]> {
    return await this.emolumentRepository.find();
  }

  async update(emolument: Emolument, id: number): Promise<void> {
    await this.emolumentRepository.update(id, emolument);
  }

  async delete(id: number): Promise<void> {
    await this.emolumentRepository.delete(id);
  }

  calculateEmolument(emolument: number): number {
    if (emolument <= 1000) {
      return emolument * 0.05;
    } else if (emolument <= 5000) {
      return emolument * 0.075;
    } else {
      return emolument * 0.1;
    }
  }
}
