import { prisma } from "../lib/prisma.js";

class statsService {
  async getStatsWeekly(userId: string) {
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
      return {
        message: "Not arguments enough",
      };
    }

    const latest = stats[0];
    const oldest = stats[stats.length - 1];

    const lostWeight = oldest!.weight - latest!.weight;
    const averageWeight = (oldest!.weight + latest!.weight) / 2;

    return {
      data: [
        {
          lostWeight,
          averageWeight,
        },
      ],
    };
  }

  async getStatsMonthly(userId: string) {
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
      return {
        message: "Not arguments enough",
      };
    }

    const latest = stats[0];
    const oldest = stats[stats.length - 1];

    const lostWeight = oldest!.weight - latest!.weight;
    const averageWeight = (oldest!.weight + latest!.weight) / 2;

    return {
      data: [
        {
          lostWeight,
          averageWeight,
        },
      ],
    };
  }

  async getStatsProgress(userId: string) {
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

    return {
      data: [
        {
          firstWeight: fistWeight[0]!.weight,
          currentWeight: currentWeight!.weight,
          difference: formatedDifference,
          percentage: formatedPercentage,
        },
      ],
    };
  }
}

export default new statsService();
