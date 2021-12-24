import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  value: { type: String, unique: true },
});

export const Category = model("Category", CategorySchema);
