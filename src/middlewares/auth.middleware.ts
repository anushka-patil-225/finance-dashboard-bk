import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

export const authenticate = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let token = authHeader.split(" ")[1];
  token = token.replace(/^"|"$/g, "");

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // 🔥 EXTRA SECURITY CHECK
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.status !== "ACTIVE") {
      return res.status(401).json({
        message: "User inactive or not found",
      });
    }

    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};