import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { get } from "./config.js";

const cache = undefined; // TODO: Cache management - how old? a few hours

const API = new BlockFrostAPI({
  projectId: get("BLOCK_FROST_API_KEY"),
});

export async function getPoolsHistory() {
  const poolIds = get("POOLS_IDS").split(",");

  const pools = await Promise.all(
    poolIds.map((id) => API.poolsByIdHistory(id, { order: "desc" }))
  );

  const result = Object.values(
    pools.flat().reduce((acc, { epoch, active_stake, delegators_count }) => {
      acc[epoch] ??= { epoch, active_stake: BigInt(0), delegators_count: 0 };
      acc[epoch].active_stake += BigInt(active_stake);
      acc[epoch].delegators_count += Number(delegators_count);

      return acc;
    }, {})
  );
  return result;
}
