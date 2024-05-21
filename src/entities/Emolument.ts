import "reflect-metadata";
import { IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Protest from "./Protest";

@Entity({ name: "emoluments" })
class Emolument {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ type: "numeric", nullable: false })
  @IsNumber()
  @IsPositive()
  public value: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  public description: string;

  @OneToOne(() => Protest, { eager: true })
  @JoinColumn({ name: "protestId" })
  @ValidateNested()
  @IsNotEmpty()
  public protest: Protest;

  constructor(value: number, description: string, protest: Protest) {
    this.value = value;
    this.description = description;
    this.protest = protest;
  }
}

export default Emolument;
