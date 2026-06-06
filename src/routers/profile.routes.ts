import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import profileController from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get("/profile", authMiddleware, profileController.getProfile);
profileRouter.put("/profile", authMiddleware, profileController.setProfile);

export default profileRouter;
