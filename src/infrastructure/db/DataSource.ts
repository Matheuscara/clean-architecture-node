import { DataSource } from "typeorm";
import Protest from "../../entities/Protest";
import { CreateProtestsTable1674307725393 } from "./migrations/CreateProtestsTable1674307725393";
import User from "../../entities/User";
import { CreateEmolumentosTable1674307725394 } from "./migrations/CreateEmolumentosTable1674307725394";
import { CreateUsuariosTable1674307725395 } from "./migrations/CreateUsersTable1674307725395";
import dotenv from "dotenv";
import Emolument from "../../entities/Emolument";

dotenv.config();

export const myDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Protest, Emolument, User],
    migrations: [CreateProtestsTable1674307725393, CreateEmolumentosTable1674307725394, CreateUsuariosTable1674307725395],
    migrationsRun: process.env.DB_MIGRATIONS ? true : false,
    logging: process.env.DB_DEVELOPMENT ? true : false,
    synchronize: true,
});
