import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IJwtRequest extends Request {
  user: { id: string; roles: string[] } | string | JwtPayload;
}

export interface IProfileJwtVerify {
  exp: number;
  iat: number;
  id: string;
  roles: string[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  roles: string[];
}
