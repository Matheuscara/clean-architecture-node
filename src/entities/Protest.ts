import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "protests" })
class Protest {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ type: "int", nullable: false })
  @IsInt()
  @IsNotEmpty()
  public amount: number;

  @Column({ type: "date", nullable: true })
  @IsOptional()
  public registrationDate: Date;

  @Column('varchar', { length: 100, nullable: false })
  @IsString()
  @IsNotEmpty()
  public description: string;

  @Column('varchar', { length: 100, nullable: true })
  @IsOptional()
  @IsString()
  public userId: string;

  constructor(amount: number, registrationDate: Date, description: string, userId: string) {
    this.amount = amount;
    this.registrationDate = registrationDate;
    this.description = description;
    this.userId = userId;
  }
}

export default Protest;
