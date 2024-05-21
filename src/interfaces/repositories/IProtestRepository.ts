import Protest from "../../entities/Protest";

export interface IProtestRepository {
  save(protestDTO: Protest): Promise<void>;
  findById(id: number): Promise<Protest | null>;
  findAll(): Promise<Protest[]>;
  update(protest: Protest, id: number): Promise<void>;
  delete(id: string): Promise<void>;
}
