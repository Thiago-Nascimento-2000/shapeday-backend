import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import z from "zod";

const goalsWeightsSchema = z.object({
  targetWeight: z.number(),
});

const goalsWaterSchema = z.object({
  targetWater: z.number(),
});

class goalsController {
  async setWeightGoals(req: Request, res: Response) {
    const { targetWeight } = goalsWeightsSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const goalWeight = await prisma.goal.create({
      data: {
        userId,
        targetWeight,
        isCompletedWeight: false,
      },
    });

    return res.json({
      message: "Goal updated successfully",
      data: goalWeight.targetWeight,
    });
  }

  async getWeightGoals(req: Request, res: Response) {
    const userId = req.userId;

    const goalWeight = await prisma.goal.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      message: "Goal fetched successfully",
      data: goalWeight,
    });
  }

  async setWaterGoals(req: Request, res: Response) {
    const { targetWater } = goalsWaterSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await prisma.goal.create({
      data: {
        userId,
        targetWater,
        isCompletedWater: false,
      },
    });

    return res.json({
      message: "Goal updated successfully",
      data: { targetWater },
    });
  }

  async getWaterGoals(req: Request, res: Response) {
    const userId = req.userId;

    const goal = await prisma.goal.findMany({
      where: {
        userId: userId,
      },
    });

    return res.json({
      message: "Goal fetched successfully",
      data: goal,
    });
  }
}

export default new goalsController();
