import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import profileController from "../controllers/profileController.js";
import weightsController from "../controllers/weightsController.js";
import dashboardController from "../controllers/dashboardController.js";
import statsController from "../controllers/statsController.js";
import goalsController from "../controllers/goalsController.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/change-password", authMiddleware, authController.changePassword);
router.put("/change-email", authMiddleware, authController.changeEmail);

router.get("/profile", authMiddleware, profileController.getProfile);
router.put("/profile", authMiddleware, profileController.setProfile);

router.post("/weights", authMiddleware, weightsController.setWeight);
router.get("/weights", authMiddleware, weightsController.getWeight);
router.get("/weights/latest", authMiddleware, weightsController.latestWeight);

router.get("/dashboard", authMiddleware, dashboardController.getDashboard);

router.get("/stats/weekly", authMiddleware, statsController.getStatsWeekly);
router.get("/stats/monthly", authMiddleware, statsController.getStatsMonthly);
router.get("/stats/progress", authMiddleware, statsController.getStatsProgress);

router.post("/goals/weight", authMiddleware, goalsController.setWeightGoals);
router.get("/goals/weight", authMiddleware, goalsController.getWeightGoals);
router.post("/goals/water", authMiddleware, goalsController.setWaterGoals);
router.get("/goals/water", authMiddleware, goalsController.getWaterGoals);

/*
router.delete("goals/weights/:id");
router.delete("/goals/water/:id");
*/
export default router;
