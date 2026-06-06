import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import dashboardController from "../controllers/dashboardController.js";

const dashboardRouter = Router();

dashboardRouter.get(
  "/dashboard",
  authMiddleware,
  dashboardController.getDashboard,
);

export default dashboardRouter;
