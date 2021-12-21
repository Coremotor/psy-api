import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email не зарегистрирован" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Введен неверный пароль" });
    }
    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "login server error" });
  }
};

// export const addRoles = async (req: Request, res: Response) => {
//   try {
//     const userRole = new RoleModel();
//     const adminRole = new RoleModel({ value: "ADMIN" });
//
//     await userRole.save();
//     await adminRole.save();
//
//     res.status(200).json({
//       route: "add-roles-done",
//     });
//   } catch (e) {
//     console.log("signIn", e);
//   }
// };
