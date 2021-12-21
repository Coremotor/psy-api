import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { Role, Roles } from "../models/role";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "Email, name and password is require fields" });
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ massage: "Пользователь с таким email уже существует!" });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: Roles.USER });
    const user = new User({
      email,
      name,
      password: hashPassword,
      roles: [userRole.value],
    });
    user.save();
    return res.json({ message: "Пользователь успешно зарегистрирован" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "registration server error" });
  }
};
