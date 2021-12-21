import express from "express";
import log4js from "log4js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router";

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const app = express();

app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000;
app.get("/", (request, response) => {
  response.send("Hello world!");
});

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@psy-db.mlv7d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
