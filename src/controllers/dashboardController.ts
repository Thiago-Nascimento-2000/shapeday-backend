import { type Request, type Response } from "express";
import dashboardService from "../services/dashboardService.js";

class dashboardController {
  async getDashboard(req: Request, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const dashboard = await dashboardService.getDashboard(userId);

      return res.json({
        message: "Dashboard fetched successfully",
        data: dashboard,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new dashboardController();
