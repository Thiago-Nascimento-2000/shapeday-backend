import { Router } from "express";
import authRouter from "./auth.routes.js";
import dashboardRouter from "./dashboard.routes.js";
import profileRouter from "./profile.routes.js";
import weightsRouter from "./weights.routes.js";
import statsRouter from "./stats.routes.js";
import goalsRouter from "./goals.routes.js";

const router = Router();

router.use("/", authRouter);
router.use("/", dashboardRouter);
router.use("/", profileRouter);
router.use("/", weightsRouter);
router.use("/", statsRouter);
router.use("/", goalsRouter);

export default router;
