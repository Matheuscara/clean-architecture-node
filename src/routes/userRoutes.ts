import { Router } from "express";
import { UserController } from "../interfaces/controllers/UserController";
import { authenticateJWT } from "../infrastructure/http/middleware/middleware";

export const userRoutes = (userController: UserController): Router => {
  const router = Router();

  router.post("/create", (req, res) => userController.createUser(req, res));

  router.post("/login", (req, res) => userController.login(req, res));

  router.get("/", authenticateJWT, (req, res) => userController.getAllUsers(req, res));

  router.get("/:id", authenticateJWT, (req, res) => userController.getUserById(req, res));

  router.put("/:id", authenticateJWT, (req, res) => userController.updateUser(req, res));

  router.delete("/:id", authenticateJWT, (req, res) => userController.deleteUser(req, res));

  return router;
};
