import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  public password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;
