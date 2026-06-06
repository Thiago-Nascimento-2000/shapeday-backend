import { prisma } from "../lib/prisma.js";

class ProfileService {
  async setProfile(
    name: string,
    height: number,
    targetWeight: number,
    userId: string,
  ) {
    const updateProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: { name, height, targetWeight },
            update: { name, height, targetWeight },
          },
        },
      },
    });

    return {
      data: updateProfile,
    };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    return {
      data: user,
    };
  }
}

export default new ProfileService();
