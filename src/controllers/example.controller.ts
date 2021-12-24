import { Request, Response } from "express";
import { Story, Person } from "../models/example";

export const addPersons = async (req: Request, res: Response) => {
  try {
    const { name, age, stories } = req.body;

    const person = new Person({
      name,
      age,
      stories,
    });

    await person.save();

    res.status(200).send("Person is added");
  } catch (e) {
    console.log(e);
    res.status(500).send("Person not added");
  }
};

export const addStories = async (req: Request, res: Response) => {
  try {
    const { author, title, fans } = req.body;
    const story = new Story({ author, title, fans });

    await story.save();

    res.status(200).send("Story is added");
  } catch (e) {
    console.log(e);
    res.status(500).send("Story not added");
  }
};

export const findPersonStories = async (req: Request, res: Response) => {
  try {
    const { personId } = req.query;

    const stories = await Person.findOne({ _id: personId }).populate("stories");

    res.status(200).json(stories);
  } catch (e) {
    console.log(e);
    res.status(500).send("Find error");
  }
};
