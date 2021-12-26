import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
  title: { type: String, unique: true, require: true },
  description: { type: String, unique: true, require: true },
  textHTML: { type: String, unique: true, require: true },
  categories: [{ type: String, require: true, ref: "Category" }],
  previewImage: { type: String, require: true },
  isDraft: { type: Boolean, require: true },
  isArchive: { type: Boolean, require: true },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

export const Article = model("Article", ArticleSchema);
