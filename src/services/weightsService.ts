import { prisma } from "../lib/prisma.js";

class WeightsService {
  async setWeight(userId: string, weight: number) {
    await prisma.weightRecord.create({
      data: {
        userId,
        weight: weight,
      },
    });

    return {
      data: weight,
    };
  }

  async getWeight(userId: string) {
    const weights = await prisma.weightRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: weights,
    };
  }

  async latestWeight(userId: string) {
    const weight = await prisma.weightRecord.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: weight,
    };
  }
}

export default new WeightsService();
