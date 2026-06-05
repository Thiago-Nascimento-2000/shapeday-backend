import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ENV from "../env/index.js";

interface DecodedToken {
  id: string;
  email: string;
}

const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid token format",
    });
  }

  try {
    const decodedToken = jwt.verify(token, ENV.JWT_SECRET!) as DecodedToken;

    req.userId = decodedToken.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
