import Emolument from "../../entities/Emolument";

export interface IEmolumentRepository {
  save(emolument: Emolument): Promise<void>;
  findById(id: number): Promise<Emolument | null>;
  findAll(): Promise<Emolument[]>;
  update(emolument: Emolument, id: number): Promise<void>;
  delete(id: number): Promise<void>;
  calculateEmolument(emolument: number): number;
}
