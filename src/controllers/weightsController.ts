import { type Request, type Response } from "express";
import { weightsSchema } from "../schemas/weights.schema.js";
import WeightsService from "../services/weightsService.js";

class weightsController {
  async setWeight(req: Request, res: Response) {
    const { weight } = weightsSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const weightRecord = await WeightsService.setWeight(userId, weight);

      return res.json({
        message: "Weight updated successfully",
        data: weightRecord,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getWeight(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const weight = await WeightsService.getWeight(userId);

      return res.json({
        message: "Weight fetched successfully",
        data: weight,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async latestWeight(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const weight = await WeightsService.latestWeight(userId);

      return res.json({
        message: "Latest weight fetched successfully",
        data: weight,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new weightsController();
