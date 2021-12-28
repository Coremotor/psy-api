import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, require: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    roles: [{ type: String, ref: "Role" }],
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
