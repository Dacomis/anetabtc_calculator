import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { get } from "./config.js";
import {
  mergeWithKey,
  pipe,
  flatten,
  map,
  pick,
  evolve,
  groupBy,
  prop,
  reduce,
  values,
} from "ramda";

const cache = undefined; // TODO: Cache management - how old? a few hours

const API = new BlockFrostAPI({
  projectId: get("BLOCK_FROST_API_KEY"),
});

export async function getPoolsHistory() {
  const poolIds = get("POOLS_IDS").split(",");

  const pools = await Promise.all(
    poolIds.map((id) => API.poolsByIdHistory(id, { order: "desc" }))
  );

  const combine = mergeWithKey((k, l, r) =>
    k === "active_stake" || k === "delegators_count" ? l + r : r
  );

  const mergeData = pipe(
    flatten, // flatten to a single array
    map(
      pipe(
        pick(["epoch", "active_stake", "delegators_count"]), // pick wanted properties
        evolve({ active_stake: BigInt }) // convert values to BigInt
      )
    ),
    groupBy(prop("epoch")), // group by the name
    map(reduce(combine, {})), // combine each group to a single object
    values // convert back to array
  );

  const results = mergeData(pools);
  return results;
}
