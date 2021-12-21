import { Schema, model } from "mongoose";

export const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const RoleSchema = new Schema({
  value: { type: String, unique: true, default: Roles.USER },
});

export const Role = model("Role", RoleSchema);
