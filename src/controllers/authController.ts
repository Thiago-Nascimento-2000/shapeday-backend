import { type Request, type Response } from "express";
import * as authSchemas from "../schemas/auth.schema.js";
import AuthService from "../services/authService.js";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const body = authSchemas.RegisterSchema.parse(req.body);
      await AuthService.register(body);

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const body = authSchemas.LoginSchema.parse(req.body);
      const token = await AuthService.login(body);

      return res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const body = authSchemas.ChangePasswordSchema.parse(req.body);
      await AuthService.changePassword({ ...body, userId: req.userId });

      return res.json({ message: "Password updated successfully" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async changeEmail(req: Request, res: Response) {
    try {
      const body = authSchemas.ChangeEmailSchema.parse(req.body);
      await AuthService.changeEmail({ ...body, userId: req.userId });
      return res.json({ message: "Email updated successfully" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
