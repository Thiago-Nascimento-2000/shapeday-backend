import { prisma } from "../lib/prisma.js";

class DashboardService {
  async getDashboard(userId: string) {
    const currentWeight = await prisma.weightRecord.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const currentHeight = await prisma.profile.findFirst({
      where: { userId },
      select: {
        height: true,
      },
    });

    const firstWeight = await prisma.weightRecord.findFirst({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    if (!currentWeight || !currentHeight || !firstWeight) {
      return {
        message: "Dashboard fetched error lack of arguments",
        data: {
          currentWeight: null,
          firstWeight: null,
          lostWeight: null,
          imc: null,
          imcClass: null,
        },
      };
    }

    const lostWeight = currentWeight?.weight! - firstWeight?.weight!;

    const lostWeightFormated = parseFloat(lostWeight.toFixed(3));

    const calculetedIMC =
      currentWeight?.weight! /
      (currentHeight?.height! * currentHeight?.height!);

    const formatedIMC = parseFloat(calculetedIMC.toFixed(3));

    function getIMCType(imc: typeof formatedIMC) {
      if (imc < 18.5) return "Magreza";
      if (imc < 25) return "Normal";
      if (imc < 30) return "Sobrepeso";
      if (imc < 35) return "Obesidade I";
      if (imc < 40) return "Obesidade II";
      return "Obesidade III";
    }

    return {
      data: {
        currentWeight: currentWeight?.weight,
        firstWeight: firstWeight?.weight,
        lostWeight: lostWeightFormated,
        imc: formatedIMC,
        imcClass: getIMCType(formatedIMC),
      },
    };
  }
}

export default new DashboardService();
