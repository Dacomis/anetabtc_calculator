import express from "express";
import { get } from "./config.js";
import { getPoolsHistory } from "./cardano.js";

const PORT = get("PORT");

const app = express();

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
