import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.put(
  "/change-password",
  authMiddleware,
  authController.changePassword,
);
authRouter.put("/change-email", authMiddleware, authController.changeEmail);

export default authRouter;
