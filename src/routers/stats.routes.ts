import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import statsController from "../controllers/statsController.js";

const statsRouter = Router();

statsRouter.get(
  "/stats/weekly",
  authMiddleware,
  statsController.getStatsWeekly,
);
statsRouter.get(
  "/stats/monthly",
  authMiddleware,
  statsController.getStatsMonthly,
);
statsRouter.get(
  "/stats/progress",
  authMiddleware,
  statsController.getStatsProgress,
);

export default statsRouter;
