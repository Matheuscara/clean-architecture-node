import { Router } from "express";
import { ProtestController } from "../interfaces/controllers/ProtestController";
import { authenticateJWT } from "../infrastructure/http/middleware/middleware";

export const protestRoutes = (protestController: ProtestController): Router => {
  const router = Router();

  router.post("/create", authenticateJWT, (req, res) => protestController.createProtest(req, res));

  router.get("/", authenticateJWT, (req, res) => protestController.getAllProtestes(req, res));

  router.get("/:id", authenticateJWT,(req, res) => protestController.getByIdProtestes(req, res));

  router.put("/:id", authenticateJWT, (req, res) => protestController.updateProtest(req, res));

  router.delete("/:id", authenticateJWT, (req, res) => protestController.deleteProtest(req, res));

  return router;
};
