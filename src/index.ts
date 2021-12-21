import express from "express";
import log4js from "log4js";
import dotenv from "dotenv";

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const app = express();
const port = process.env.PORT || 5000;
app.get("/", (request, response) => {
  response.send("Hello world!");
});
app.listen(port, () => console.log(`Running on port ${port}`));
