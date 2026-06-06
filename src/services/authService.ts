import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../env/index.js";
import * as authTypes from "../types/auth.type.js";
import AuthRepository from "../repositories/authRepository.js";

class AuthService {
  async register({
    name,
    email,
    password,
    confirmPassword,
  }: authTypes.RegisterData) {
    const emailExists = await AuthRepository.findByEmail(email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return AuthRepository.createAccount(name, email, hashedPassword);
  }

  async login({ email, password }: authTypes.LoginData) {
    const findUser = await AuthRepository.findUserEmail(email);

    if (!findUser) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: findUser.id, email: findUser.email },
      ENV.JWT_SECRET!,
      {
        expiresIn: ENV.JWT_EXPIRES_IN,
      },
    );

    return { token };
  }

  async changePassword(data: authTypes.ChangePasswordData) {
    const userFromDB = await AuthRepository.findUserId(data);

    if (!userFromDB) {
      throw new Error("User not found");
    }

    const comparePassword = bcrypt.compareSync(
      data.currentPassword,
      userFromDB.password,
    );

    if (!comparePassword) {
      throw new Error("Current password is incorrect");
    }

    if (data.currentPassword === data.newPassword) {
      throw new Error(
        "New password cannot be the same as the current password",
      );
    }

    const hashedPassword = bcrypt.hashSync(data.newPassword, 10);

    await AuthRepository.updateUserPassword(data, hashedPassword);
  }

  async changeEmail({ userId, password, newEmail }: authTypes.ChangeEmailData) {
    const userFromDB = await AuthRepository.findUserEmail(userId);
    if (!userFromDB) {
      throw new Error("User not found");
    }

    const comparePassword = bcrypt.compareSync(password, userFromDB.password);

    if (!comparePassword) {
      throw new Error("Password is incorrect");
    }

    const emailExists = await AuthRepository.findUserNewEmail(newEmail);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    if (userFromDB.email === newEmail) {
      throw new Error("New email cannot be the same as the current email");
    }

    await AuthRepository.updateUserNewEmail(userId, newEmail);
  }
}

export default new AuthService();
