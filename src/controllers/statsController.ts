import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

class statsController {
  async getStatsWeekly(req: Request, res: Response) {
    const userId = req.userId;

    const stats = await prisma.weightRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 7,
    });

    if (stats.length < 2) {
      return res.json({
        message: "Not arguments enough",
      });
    }

    const latest = stats[0];
    const oldest = stats[stats.length - 1];

    const lostWeight = oldest!.weight - latest!.weight;
    const averageWeight = (oldest!.weight + latest!.weight) / 2;

    return res.json({
      message: "Stats fetched successfully",
      data: [
        {
          lostWeight,
          averageWeight,
        },
      ],
    });
  }

  async getStatsMonthly(req: Request, res: Response) {
    const userId = req.userId;

    const stats = await prisma.weightRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 30,
    });

    if (stats.length < 2) {
      return res.json({
        message: "Not arguments enough",
      });
    }

    const latest = stats[0];
    const oldest = stats[stats.length - 1];

    const lostWeight = oldest!.weight - latest!.weight;
    const averageWeight = (oldest!.weight + latest!.weight) / 2;

    return res.json({
      message: "Stats fetched successfully",
      data: [
        {
          lostWeight,
          averageWeight,
        },
      ],
    });
  }

  async getStatsProgress(req: Request, res: Response) {
    const userId = req.userId;

    const fistWeight = await prisma.weightRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 30,
    });

    const currentWeight = await prisma.weightRecord.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const diferrence = currentWeight!.weight - fistWeight[0]!.weight;
    const percentage = (diferrence / fistWeight[0]!.weight) * 100;

    const formatedDifference = parseFloat(diferrence.toFixed(2));
    const formatedPercentage = `${parseFloat(percentage.toFixed(2))}` + "%";

    return res.json({
      message: "Stats fetched successfully",
      data: [
        {
          firstWeight: fistWeight[0]!.weight,
          currentWeight: currentWeight!.weight,
          difference: formatedDifference,
          percentage: formatedPercentage,
        },
      ],
    });

    /*{
  "firstWeight": 110,
  "currentWeight": 102,
  "difference": -8,
  "percentage": -7.27
}*/
  }
}

export default new statsController();
