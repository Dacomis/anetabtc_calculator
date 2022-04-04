import { PoolsHistoryEpoch } from "../interfaces/interfaces";

export const isNumber = (number: string): boolean => {
  if (typeof number != "string") return false;
  return !isNaN(Number(number)) && !isNaN(parseFloat(number));
};

export const formatADAtoNumber = (ada: string): number =>
  Number(ada.replace(/[|&;$%@"<>()+, ADA]/g, ""));

export const formatDelegationPeriod = (
  delegationPeriod: number | string
): number => {
  return typeof delegationPeriod === "number"
    ? delegationPeriod
    : Number(delegationPeriod.replace(/[|&;$%@"<>()+, epochs]/g, ""));
};

export const isStakingAddress = (address: string): boolean => {
  return typeof address === "string" &&
    address.length === 59 &&
    address.startsWith("stake1u")
    ? true
    : false;
};

export const lovelacesToADA = (lovelaces: number): number =>
  lovelaces / 1000000;

export const ADAwith2Decimals = (lovelaces: number): string =>
  Number(lovelacesToADA(lovelaces)).toFixed(2);

export const ADAWithCommas = (number: number) => {
  return ADAwith2Decimals(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//TODO: make this more elegant
export const totalRewards = (stakedADA: {
  [active_epoch: number]: number;
}): number[] => {
  let accumulator = 0;
  let rewards: number[] = [];

  rewardsPerEpoch(stakedADA).map((multiplier, index) => {
    accumulator += Object.entries(stakedADA)[index][1] * multiplier;

    return rewards.push(
      Number((Math.round(accumulator * 100) / 100).toFixed(2))
    );
  });

  return rewards;
};

export const constructEpochs = (totalRewardsDict: {
  [active_epoch: number]: number;
}) => Object.keys(totalRewardsDict);

export const rewardsPerEpoch = (totalRewardsDict: {
  [active_epoch: number]: number;
}): number[] => {
  const rewards: number[] = [];

  Object.keys(totalRewardsDict).map((key, index) => {
    if (Number(key) === 318) {
      rewards.push(1);
    } else if (index === 11) {
      rewards.push(0.506);
    } else {
      rewards.push(0.006);
    }
    return rewards;
  });

  return rewards;
};

export const stakingHistoryDict = (
  history: { active_epoch: number; amount: string }[]
): { [active_epoch: number]: number } => {
  let stakingHistoryD: { [active_epoch: number]: number } = {};
  history.map(
    (p: { active_epoch: number; amount: string }) =>
      (stakingHistoryD[p.active_epoch] = lovelacesToADA(Number(p.amount)))
  );

  return stakingHistoryD;
};

export const stakedADADict = (
  currentEpoch: number,
  delegationPeriod: number,
  stakedADA: number
): { [active_epoch: number]: number } => {
  let stakedADAD: { [active_epoch: number]: number } = {};
  let delegationPeriodArr = new Array(delegationPeriod)
    .fill(undefined)
    .map((val, idx) => idx);

  delegationPeriodArr.map(
    (elem: any, index: number) => (stakedADAD[currentEpoch + index] = stakedADA)
  );

  return stakedADAD;
};

export const getEpochs = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.epoch);

export const getActiveStake = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.active_stake);

export const getDelegators = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.delegators_count);
