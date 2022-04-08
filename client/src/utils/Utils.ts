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

export const isStakingAddress = (address: string): boolean =>
  typeof address === "string" &&
  address.length === 59 &&
  address.startsWith("stake1u")
    ? true
    : false;

export const isStakingAddressOrEmpty = (address: string): boolean => {
  return address === "" || isStakingAddress(address) ? true : false;
};

export const lovelacesToADA = (lovelaces: number): number =>
  lovelaces / 1000000;

export const ADAwith2Decimals = (lovelaces: number): string =>
  Number(lovelacesToADA(lovelaces)).toFixed(2);

export const ADAWithCommas = (number: number): string => {
  return ADAwith2Decimals(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithCommas = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//TODO: refactor this
export const totalRewards = (
  stakedADA: {
    [active_epoch: number]: number;
  },
  NFTBoost: number
): number[] => {
  let accumulator = 0;
  let rewards: number[] = [];

  rewardsPerEpoch(stakedADA, NFTBoost).map((multiplier, index) => {
    accumulator += Object.entries(stakedADA)[index][1] * multiplier;

    return rewards.push(
      Number((Math.round(accumulator * 10000) / 10000).toFixed(4))
    );
  });

  return rewards;
};

export const constructEpochs = (totalRewardsDict: {
  [active_epoch: number]: number;
}): string[] => {
  return Object.keys(totalRewardsDict);
};

//TODO: refactor this
export const rewardsPerEpoch = (
  totalRewardsDict: {
    [active_epoch: number]: number;
  },
  NFTBoost: number
): number[] => {
  const rewards: number[] = [];
  const boost: number[] = [];
  let rewardsWithBoost: number[] = [];

  Object.keys(totalRewardsDict).map((key, index) => {
    if (Number(key) < 331) {
      return boost.push(0);
    } else {
      return boost.push(NFTBoost);
    }
  });

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

  rewardsWithBoost = rewards.map((reward: number, id: number) => {
    return reward + reward * boost[id];
  });

  return rewardsWithBoost;
};

export const stakingHistoryDict = (
  history: { active_epoch: number; amount: string }[]
): { [active_epoch: number]: number } => {
  let stakingHistoryD: { [active_epoch: number]: number } = {};
  history.map(
    (h: { active_epoch: number; amount: string }) =>
      (stakingHistoryD[h.active_epoch] = lovelacesToADA(Number(h.amount)))
  );

  return stakingHistoryD;
};

//TODO: refactor this
export const stakedADADict = (
  currentEpoch: number,
  delegationPeriod: number,
  stakedADA: number
): { [active_epoch: number]: number } => {
  let stakedADAD: { [active_epoch: string]: any } = {};
  let delegationPeriodArr = new Array(delegationPeriod)
    .fill(undefined)
    .map((val, idx) => idx);

  delegationPeriodArr.map(
    (elem: any, index: number) => (stakedADAD[currentEpoch + index] = stakedADA)
  );

  return stakedADAD;
};

export const isFormInvalid = (stakingAddress: string, stakedADA: string): boolean => {
  let isInvalid = true;

  if (isStakingAddress(stakingAddress) === true) {
    isInvalid = false;
  }

  if (Number(stakedADA) > 0) {
    isInvalid = false;
  }

  return isInvalid;
};

export const getEpochs = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.epoch);

export const getActiveStake = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.active_stake);

export const getDelegators = (history: PoolsHistoryEpoch[]): number[] =>
  history.map((epoch: PoolsHistoryEpoch) => epoch.delegators_count);
