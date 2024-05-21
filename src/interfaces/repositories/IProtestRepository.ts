import Protest from "../../entities/Protest";
import { CreateProtestDTO } from "../../entities/dtos/CreateProtestDTO";

export interface IProtestRepository {
  save(protestDTO: Protest): Promise<void>;
  findById(id: number): Promise<Protest | null>;
  findAll(): Promise<Protest[]>;
  update(protest: Protest, id: number): Promise<void>;
  delete(id: number): Promise<void>;
}
