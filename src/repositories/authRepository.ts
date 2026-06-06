import { prisma } from "../lib/prisma.js";
import * as authTypes from "../types/auth.type.js";

class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createAccount(name: string, email: string, HashPassword: string) {
    return prisma.user.create({
      data: {
        name: name,
        email: email,
        password: HashPassword,
      },
    });
  }

  async findUserEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        email: true,
      },
    });
  }

  async findUserNewEmail(newEmail: string) {
    return await prisma.user.findUnique({
      where: {
        email: newEmail,
      },
    });
  }

  async updateUserNewEmail(userId: string, newEmail: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: newEmail,
      },
    });
  }

  async findUserId(data: authTypes.ChangePasswordData) {
    return prisma.user.findUnique({
      where: {
        id: data.userId,
      },
      select: {
        password: true,
      },
    });
  }

  async updateUserPassword(
    data: authTypes.ChangePasswordData,
    hashedPassword: string,
  ) {
    return prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}

export default new AuthRepository();
