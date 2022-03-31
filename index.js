import express from "express";
import cors from "cors";
import { get } from "./src/config.js";
import { getPoolsHistory } from "./src/poolsHistory.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const PORT = get("PORT");

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${PORT}`);
});
