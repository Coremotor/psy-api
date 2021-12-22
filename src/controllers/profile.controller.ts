import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { IProfileJwtVerify, IUser } from "../interfaces";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (token) {
      const profile = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      ) as IProfileJwtVerify;

      const user: IUser = await User.findOne({ _id: profile.id });

      return res.status(200).json({
        email: user.email,
        id: user._id,
        name: user.name,
        roles: user.roles,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "profile server error" });
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res
        .status(400)
        .json({ message: "Email and name is require fields" });
    }

    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (token) {
      const profile = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      ) as IProfileJwtVerify;

      await User.updateOne({ _id: profile.id }, { name: name, email: email });
      const updatedUser = await User.findOne({ _id: profile.id });
      return res.status(200).json({
        email: updatedUser.email,
        id: updatedUser._id,
        name: updatedUser.name,
        roles: updatedUser.roles,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "edit profile server error" });
  }
};
