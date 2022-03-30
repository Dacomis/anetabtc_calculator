import { PoolsHistoryEpoch } from "../interfaces/interfaces";

export const isNumeric = (number: string) => {
  if (typeof number != "string") return false;
  return !isNaN(Number(number)) && !isNaN(parseFloat(number));
};

export const epochsEnum = [
  // to be replaced with Blockfrost or Ogmios
  "Epoch 329",
  "Epoch 330",
  "Epoch 331",
  "Epoch 332",
  "Epoch 333",
  "Epoch 334",
  "Epoch 335",
  "Epoch 336",
  "Epoch 337",
  "Epoch 338",
  "Epoch 339",
  "Epoch 340", //12
  "Epoch 341",
  "Epoch 342",
  "Epoch 343",
  "Epoch 344",
  "Epoch 345",
  "Epoch 346",
  "Epoch 347",
  "Epoch 348",
  "Epoch 349",
  "Epoch 350",
  "Epoch 351",
  "Epoch 352",
  "Epoch 353",
];

export const twoDecimals = (number: number): string =>
  Number(number).toFixed(2);

export const lovelacesToADA = (lovelaces: number): string =>
  twoDecimals(lovelaces / 1000000);

export const ADAWithCommas = (number: number) => {
  return lovelacesToADA(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//make this functional with Ramda
export const totalRewards = (stakedADA: number, rewardsPerEpoch: number[]) => {
  let x = 0;
  let y: number[] = [];

  rewardsPerEpoch.map((rewards) => {
    x = x + stakedADA * rewards;
    return y.push(Number((Math.round(x * 100) / 100).toFixed(2)));
  });
  return y;
};

export const rewardsPerEpoch = (epochs: string[]) => {
  const rewards: number[] = [];
  epochs.map((epochs, index) =>
    index === 12 ? rewards.push(0.506) : rewards.push(0.006)
  );
  return rewards;
};

export const getEpochs = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.epoch);

export const getActiveStake = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.active_stake);

export const getDelegators = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.delegators_count);
