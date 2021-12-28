import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { IJwtRequest } from "../interfaces";

export const authGuard: RequestHandler = (
  req: IJwtRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Authorization error" });
  }
};

export const rolesGuard = (roles: string[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }

      const { roles: userRoles }: any = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      );

      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет прав доступа" });
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Roles error" });
    }
  };
};
