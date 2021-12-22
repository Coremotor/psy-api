import { Request, Response } from "express";
import { User } from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "users server error" });
  }
};
