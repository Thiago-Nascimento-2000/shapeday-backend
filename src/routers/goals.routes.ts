import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import goalsController from "../controllers/goalsController.js";

const goalsRouter = Router();

goalsRouter.post(
  "/goals/weight",
  authMiddleware,
  goalsController.setWeightGoals,
);
goalsRouter.get(
  "/goals/weight",
  authMiddleware,
  goalsController.getWeightGoals,
);
goalsRouter.post("/goals/water", authMiddleware, goalsController.setWaterGoals);
goalsRouter.get("/goals/water", authMiddleware, goalsController.getWaterGoals);

export default goalsRouter;
