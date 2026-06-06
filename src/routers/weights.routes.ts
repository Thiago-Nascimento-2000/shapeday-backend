import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import weightsController from "../controllers/weightsController.js";

const weightsRouter = Router();

weightsRouter.post("/weights", authMiddleware, weightsController.setWeight);
weightsRouter.get("/weights", authMiddleware, weightsController.getWeight);
weightsRouter.get(
  "/weights/latest",
  authMiddleware,
  weightsController.latestWeight,
);

export default weightsRouter;
