import type { Request, Response } from "express";
import goalsService from "../services/goalsService.js";
import {
  goalsWaterSchema,
  goalsWeightsSchema,
} from "../schemas/goals.schema.js";

class goalsController {
  async setWeightGoals(req: Request, res: Response) {
    const { targetWeight } = goalsWeightsSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const goalWeight = await goalsService.createWeightGoal(
        userId,
        targetWeight,
      );

      res.status(200).json(goalWeight);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getWeightGoals(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const goalWeight = await goalsService.getWeightGoals(userId);

      res.status(200).json(goalWeight);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async setWaterGoals(req: Request, res: Response) {
    const { targetWater } = goalsWaterSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const goalWater = await goalsService.setWaterGoals(userId, targetWater);

      res.status(200).json(goalWater);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getWaterGoals(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const goalWater = await goalsService.getWaterGoals(userId);

      res.status(200).json(goalWater);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new goalsController();
