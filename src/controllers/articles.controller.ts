import { Request, Response } from "express";
import { Article } from "../models/article";

export const addArticle = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      textHTML,
      categories,
      previewImage,
      isDraft,
      isArchive,
    } = req.body;
    const article = new Article({
      title,
      description,
      textHTML,
      categories,
      previewImage,
      isDraft,
      isArchive,
    });

    await article.save();

    res.status(200).send("add-article-done");
  } catch (e) {
    console.log(e);
    res.status(500).send("Article not added");
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const article = req.body;
    const { id } = req.params;
    await Article.updateOne({ _id: id }, article);
    const updatedArticle = await Article.findOne({ _id: id });

    res.status(200).json(updatedArticle);
  } catch (e) {
    console.log(e);
    res.status(500).send("Article not update");
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { category, sortByDate, sortByViews, limit } = req.query;
    // console.log(category, sortByDate, sortByViews, limit);
    if (category) {
      const articles = await Article.find({ categories: category }).sort({
        createdAt: sortByDate || "desc",
      });
      res.status(200).json(articles);
    } else if (limit && sortByViews) {
      const articles = await Article.find()
        .sort({
          views: sortByViews,
          createdAt: sortByDate || "desc",
        })
        .limit(+limit);
      res.status(200).json(articles);
    } else {
      const articles = await Article.find().sort({
        createdAt: sortByDate,
      });
      res.status(200).json(articles);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Articles not find");
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const { withView } = req.query;
    const { id } = req.params;
    const article = await Article.findOne({ _id: id });
    if (withView) {
      await Article.updateOne({ _id: id }, { views: article.views + 1 });
    }
    res.status(200).json(article);
  } catch (e) {
    console.log(e);
    res.status(500).send("Article not find");
  }
};
