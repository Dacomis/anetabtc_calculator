import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { get } from "./config.js";

const cache = undefined; // TODO: Cache management - how old? a few hours

const API = new BlockFrostAPI({
  projectId: get("BLOCK_FROST_API_KEY"),
});

export async function getPoolsHistory() {
  const poolIds = [get("POOL1"), get("POOL2")];
  const pools = await Promise.all(
    poolIds.map((id) => API.poolsByIdHistory(id, { order: "desc" }))
  );

  const [firstPool, ...otherPools] = pools; //lambda

  const y = firstPool.map((elem) => {
    const data = {
      epoch: elem.epoch,
      delegators_count: elem.delegators_count,
      active_stake: BigInt(elem.active_stake),
    };

    otherPools.forEach((pool) => {
      pool.forEach((otherElem) => {
        data.delegators_count += otherElem.delegators_count;
        data.active_stake += BigInt(otherElem.active_stake);
      });
    });

    return data;
  });
  return y;
}

getPoolsHistory();
