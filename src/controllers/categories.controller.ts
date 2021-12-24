import { Request, Response } from "express";
import { Category } from "../models/category";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { value } = req.body;
    const category = new Category({ value });

    await category.save();

    res.status(200).send("add-category-done");
  } catch (e) {
    console.log(e);
    res.status(500).send("Category not added");
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    const categoriesArray = categories.map((c) => {
      return c.value;
    });
    return res.status(200).json(categoriesArray);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "categories server error" });
  }
};
