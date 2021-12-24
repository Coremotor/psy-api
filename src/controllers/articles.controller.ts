import { Request, Response } from "express";
import { Article } from "../models/article";

export const addArticle = async (req: Request, res: Response) => {
  try {
    const { title, description, textHTML, categories, previewImage } = req.body;
    const article = new Article({
      title,
      description,
      textHTML,
      categories,
      previewImage,
    });

    await article.save();

    res.status(200).send("add-article-done");
  } catch (e) {
    console.log(e);
    res.status(500).send("Article not added");
  }
};
