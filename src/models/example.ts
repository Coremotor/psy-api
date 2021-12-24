import { Schema, model } from "mongoose";

const personSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const storySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Person" },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

export const Story = model("Story", storySchema);
export const Person = model("Person", personSchema);