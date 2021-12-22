import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  value: { type: String, unique: true },
});

export const Role = model("Category", CategorySchema);
