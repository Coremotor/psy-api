import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
  title: { type: String, unique: true, require: true },
  description: { type: String, unique: true, require: true },
  textHTML: { type: String, unique: true, require: true },
  categories: [{ type: String, ref: "Category" }],
  likes: { type: Number },
  views: { type: Number },
  previewImage: { type: String },
  images: [{ type: String }],
});

export const Article = model("Article", ArticleSchema);
