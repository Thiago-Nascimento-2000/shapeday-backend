import { type Request, type Response } from "express";
import profileService from "../services/profileService.js";
import { ProfileSchema } from "../schemas/profile.schema.js";

class ProfileController {
  async setProfile(req: Request, res: Response) {
    const { name, height, targetWeight } = ProfileSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const profile = await profileService.setProfile(
        name,
        height,
        targetWeight,
        userId,
      );

      return res.json({
        message: "Profile updated successfully",
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const profile = await profileService.getProfile(userId);

      return res.json({
        message: "Profile fetched successfully",
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new ProfileController();
