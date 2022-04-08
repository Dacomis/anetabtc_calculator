import express from "express";
import cors from "cors";
import { get } from "./src/config.js";
import {
  getPoolsHistory,
  getDelegatorsHistory,
} from "./src/blockchainHistory.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import apicache from "apicache";

const PORT = get("PORT");

const app = express();
let cache = apicache.middleware;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));

app.use(cors());

app.get("/api/history", cache("5 minutes"), async (req, res, next) => {
  try {
    const history = await getPoolsHistory();
    res.send(history);
  } catch (error) {
    console.log(error);
    next(new Error("Error on getting the pools history"));
  }
});

app.get(
  "/api/delegatorHistory/:stakeAddress",
  cache("5 minutes"),
  async (req, res, next) => {
    try {
      const delegatorHistory = await getDelegatorsHistory(
        req.params.stakeAddress
      );
      res.send(delegatorHistory);
    } catch (error) {
      console.log(error);
      next(new Error("Error on getting the delegator's history"));
    }
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${PORT}`);
});
