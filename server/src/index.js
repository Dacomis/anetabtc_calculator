import express from "express";
import cors from "cors";
import { get } from "./config.js";
import { getPoolsHistory } from "./poolsHistory.js";

const PORT = get("PORT");

const app = express();

app.use(cors());

app.get("/api/history", async (req, res, next) => {
  try {
    const history = await getPoolsHistory();
    res.send(history);
  } catch (error) {
    console.log(error);
    next(new Error("Error on getting the pools history"));
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
