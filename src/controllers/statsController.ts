import type { Request, Response } from "express";
import statsService from "../services/statsService.js";

class statsController {
  async getStatsWeekly(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const stats = await statsService.getStatsWeekly(userId);

      return res.json({
        message: "Stats fetched successfully",
        data: stats,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getStatsMonthly(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const stats = await statsService.getStatsMonthly(userId);

      return res.json({
        message: "Stats fetched successfully",
        data: stats,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getStatsProgress(req: Request, res: Response) {
    const userId = req.userId;

    try {
      const stats = await statsService.getStatsProgress(userId);

      return res.json({
        message: "Stats fetched successfully",
        data: stats,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new statsController();
