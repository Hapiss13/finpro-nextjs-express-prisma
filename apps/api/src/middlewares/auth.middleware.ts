// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "../utils/envConfig";
import { User } from "../custom";
import { verify } from "jsonwebtoken";

// Middleware untuk memverifikasi token JWT
export async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Unauthorized");

    const user = verify(token, SECRET_KEY as string);
    if (!user) throw new Error("Unauthorized");

    req.user = user as User;
    next();
  } catch (err) {
    next(err);
  }
}

// Middleware untuk mengecek apakah pengguna adalah admin
export async function AdminGuard(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user?.role !== "admin") throw new Error("Not an Admin");
    next();
  } catch (err) {
    next(err);
  }
}
