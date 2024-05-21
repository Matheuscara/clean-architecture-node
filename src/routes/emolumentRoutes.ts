import { Router } from "express";
import { authenticateJWT } from "../infrastructure/http/middleware/middleware";
import { EmolumentController } from "../interfaces/controllers/EmolumentController";

export const emolumentRoutes = (emolumentController: EmolumentController): Router => {
  const router = Router();

  router.post("/create", authenticateJWT, (req, res) => emolumentController.createEmolument(req, res));

  router.get("/", authenticateJWT, (req, res) => emolumentController.getAllEmoluments(req, res));

  router.get("/:id", authenticateJWT,(req, res) => emolumentController.getByIdEmoluments(req, res));

  router.put("/:id", authenticateJWT, (req, res) => emolumentController.updateEmolument(req, res));

  router.delete("/:id", authenticateJWT, (req, res) => emolumentController.deleteEmolument(req, res));

  return router;
};
