import { IProtestRepository } from "../../interfaces/repositories/IProtestRepository";
import { Database } from "./Database";
import { Repository } from "typeorm";
import Protest from "../../entities/Protest";

export class ProtestRepository implements IProtestRepository {
  private db: Database;
  private protestRepository: Repository<Protest>;

  constructor(db: Database) {
    this.db = db;
    this.protestRepository = this.db.dataSource.getRepository(Protest)
  }

  async save(protestDTO: Protest): Promise<void> {
    const protestEntity = this.protestRepository.create(protestDTO)
    await  this.protestRepository.save(protestEntity)
  }

  async findById(id: number): Promise<Protest | null> {
    return await this.db.dataSource.getRepository(Protest).findOneBy({id: id});
  }

  async findAll(): Promise<Protest[]> {
    return await this.db.dataSource.getRepository(Protest).find();
  }

  async update(protest: Protest, id: number): Promise<void> {
    await this.db.dataSource.getRepository(Protest).update(id, protest);
  }

  async delete(id: number): Promise<void> {
    await this.db.dataSource.getRepository(Protest).delete(id);
  }
}
