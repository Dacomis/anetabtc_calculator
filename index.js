import express, { request } from "express";
import cors from "cors";
import http from "node:http";
import { get } from "./src/config.js";
import {
  getPoolsHistory,
  getDelegatorsHistory,
  getAllAngels,
  getAllAddressesFromStakeAddress,
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

app.use(express.static(path.join(__dirname, "./client/build")));

app.use(cors());

app.get(
  "/api/history",
  // TODO uncomment this
  cache("5 minutes"),
  async (req, res, next) => {
    try {
      const history = await getPoolsHistory();
      res.send(history);
    } catch (error) {
      console.log(error);
      next(new Error("Error on getting the pools history"));
    }
  }
);

app.get(
  "/api/delegatorHistory/:stakeAddress",
  // TODO uncomment this
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

app.get("/api/:policyID", async (req, res, next) => {
  try {
    const angels = await getAllAngels(req.params.policyID);
    res.send(angels);
  } catch (error) {
    console.log(error);
    next(new Error("Error on getting the Angels"));
  }
});

app.get("/api/:stakeAddress/addresses", async (req, res, next) => {
  try {
    const addresses = await getAllAddressesFromStakeAddress(
      req.params.stakeAddress
    );
    res.send(addresses);
  } catch (error) {
    console.log(error);
    next(new Error("Error on getting the Addresses from the Stake Address"));
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${PORT}`);
});

const angelsPolicyID =
  "af267bd857e9d78fdb5fa05e91a342907518e30b0211cdf2b9c7cd00";

const url = new URL(`http://localhost:3001/api/${angelsPolicyID}`);

const getAngelsReq = http.request(url, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding("utf8");
  res.on("data", (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", () => {
    console.log("No more data in response.");
  });
});

getAngelsReq.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

getAngelsReq.send();
