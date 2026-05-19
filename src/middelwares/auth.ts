import { auth as betterAuth } from "../lib/auth.js";
import { NextFunction, Request, Response } from "express";

export enum USERROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: USERROLE[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "you are unauthorized",
        });
      }
      if (session.user.emailVerified === false) {
        return res.status(403).json({
          success: false,
          message: "email verifycation requer",
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };
      if (roles.length && roles.includes(req.user.role as USERROLE)) {
        return res.status(403).json({
          success: false,
          message: "forbidden! you don't have access ",
        });
      }
    } catch (error) {
      console.log("error from post creation meddlewire auth");
    }
    next();
  };
};

export default auth
