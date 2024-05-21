import express from "express";
import "reflect-metadata";
import { Database } from "./infrastructure/db/Database";
import { ProtestRepository } from "./infrastructure/db/ProtestRepository";
import { CreateProtestUseCase } from "./use_cases/Protest/CreateProtest";
import { ProtestController } from "./interfaces/controllers/ProtestController";
import { protestRoutes } from "./routes/protestRoutes";
import bodyParser from "body-parser";
import { GetAllProtestUseCase } from "./use_cases/Protest/GetAllProtest";
import { GetProtestByIdUseCase } from "./use_cases/Protest/GetProtestById";
import { UpdateProtestUseCase } from "./use_cases/Protest/UpdateProtest";
import { DeleteProtestUseCase } from "./use_cases/Protest/DeleteProtest";
import { UserRepository } from "./infrastructure/db/UserRepository";
import { CreateUserUseCase } from "./use_cases/User/CreateUserUseCase";
import { GetAllUsersUseCase } from "./use_cases/User/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "./use_cases/User/GetUserByIdUseCase";
import { UpdateUserUseCase } from "./use_cases/User/UpdateUserUseCase";
import { DeleteUserUseCase } from "./use_cases/User/DeleteUserUseCase";
import { UserController } from "./interfaces/controllers/UserController";
import { userRoutes } from "./routes/userRoutes";
import dotenv from "dotenv";
import { HashPasswordUseCase } from "./use_cases/Auth/HashPasswordUseCase";
import { TokenRepository } from "./infrastructure/Security/TokenRepository";
import { AuthenticateUserUseCase } from "./use_cases/Auth/AuthenticateUserUseCase";
import { emolumentRoutes } from "./routes/emolumentRoutes";
import { EmolumentController } from "./interfaces/controllers/EmolumentController";
import { CreateEmolumentUseCase } from "./use_cases/Emolument/CreateEmolumentUseCase";
import { EmolumentRepository } from "./infrastructure/db/EmolumentRepository";
import { GetAllEmolumentUseCase } from "./use_cases/Emolument/GetAllEmolumentUseCase";
import { GetEmolumentByIdUseCase } from "./use_cases/Emolument/GetEmolumentByIdUseCase";
import { UpdateEmolumentUseCase } from "./use_cases/Emolument/UpdateEmolumentUseCase";
import { DeleteEmolumentUseCase } from "./use_cases/Emolument/DeleteEmolumentUseCase";

dotenv.config();

const app = express();
app.use(express.json());

const db = new Database();

const protestRepository = new ProtestRepository(db);

const createProtestUseCase = new CreateProtestUseCase(protestRepository);
const getAllProtestUseCase = new GetAllProtestUseCase(protestRepository);
const getProtestByIdUseCase = new GetProtestByIdUseCase(protestRepository);
const updateProtestUseCase = new UpdateProtestUseCase(protestRepository);
const deleteProtestUseCase = new DeleteProtestUseCase(protestRepository);

const protestController = new ProtestController(
  createProtestUseCase,
  getAllProtestUseCase,
  getProtestByIdUseCase,
  updateProtestUseCase,
  deleteProtestUseCase
);

const userRepository = new UserRepository(db);
const tokenRepository = new TokenRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserHashPassword = new HashPasswordUseCase(tokenRepository, createUserUseCase);
const authenticateUserUseCase = new AuthenticateUserUseCase(tokenRepository, userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
  createUserHashPassword,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  authenticateUserUseCase
);

const emolumentRepository = new EmolumentRepository(db);

const createEmolumentUseCase = new CreateEmolumentUseCase(emolumentRepository, protestRepository)
const getAllEmolumentUseCase = new GetAllEmolumentUseCase(emolumentRepository)
const getEmolumentByIdUseCase = new GetEmolumentByIdUseCase(emolumentRepository)
const updateEmolumentUseCase = new UpdateEmolumentUseCase(emolumentRepository, protestRepository)
const deleteEmolumentUseCase = new DeleteEmolumentUseCase(emolumentRepository, protestRepository)

const emolumentController = new EmolumentController(
  createEmolumentUseCase,
  getAllEmolumentUseCase,
  getEmolumentByIdUseCase,
  updateEmolumentUseCase,
  deleteEmolumentUseCase
)

app.use("/protests", protestRoutes(protestController));

app.use("/users", userRoutes(userController));

app.use("/emoluments", emolumentRoutes(emolumentController));

app.use(bodyParser.json());

db.initializeDb().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
  });
});
