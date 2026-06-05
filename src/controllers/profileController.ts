import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string(),
  height: z.coerce.number(),
  targetWeight: z.coerce.number(),
});

class ProfileController {
  async updateProfile(req: Request, res: Response) {
    const { name, height, targetWeight } = ProfileSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updateProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: { name, height, targetWeight },
            update: { name, height, targetWeight },
          },
        },
      },
    });

    return res.json({
      message: "Profile updated successfully",
      data: updateProfile,
    });
  }

  async getProfile(req: Request, res: Response) {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    return res.json({
      message: "Profile fetched successfully",
      data: user?.profile,
    });
  }
}

export default new ProfileController();
