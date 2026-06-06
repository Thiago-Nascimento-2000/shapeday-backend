import { prisma } from "../lib/prisma.js";

class goalsService {
  async createWeightGoal(userId: string, targetWeight: number) {
    const goalWeight = await prisma.goal.create({
      data: {
        userId,
        targetWeight,
        isCompletedWeight: false,
      },
    });

    return {
      message: "Goal created successfully",
      data: goalWeight.targetWeight,
    };
  }

  async getWeightGoals(userId: string) {
    const goalWeight = await prisma.goal.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      message: "Goal fetched successfully",
      data: goalWeight,
    };
  }

  async setWaterGoals(userId: string, targetWater: number) {
    await prisma.goal.create({
      data: {
        userId,
        targetWater,
        isCompletedWater: false,
      },
    });

    return {
      message: "Goal updated successfully",
      data: { targetWater },
    };
  }

  async getWaterGoals(userId: string) {
    const goal = await prisma.goal.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      message: "Goal fetched successfully",
      data: goal,
    };
  }
}

export default new goalsService();
