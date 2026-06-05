import z from "zod";
import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

const weightsSchema = z.object({
  weight: z.number(),
});

class weightsController {
  async setWeight(req: Request, res: Response) {
    const { weight } = weightsSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await prisma.weightRecord.create({
      data: {
        userId,
        weight: weight,
      },
    });

    return res.json({
      message: "Weight updated successfully",
      data: { weight },
    });
  }

  async getWeight(req: Request, res: Response) {
    const userId = req.userId;

    const weights = await prisma.weightRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      message: "Weight fetched successfully",
      data: weights,
    });
  }

  async latestWeight(req: Request, res: Response) {
    const userId = req.userId;

    const weight = await prisma.weightRecord.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      message: "Weight fetched successfully",
      data: weight,
    });
  }
}

export default new weightsController();
