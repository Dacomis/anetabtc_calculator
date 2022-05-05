import {
  ILISOIIRewards,
  ILISOIRewards,
  IStakingHistoryDict,
  PoolsHistoryEpoch,
  Size,
} from "../interfaces/interfaces";

export const getPort = (): string | undefined => process.env.REACT_APP_API_URL;

export const isNumber = (number: string): boolean => {
  if (typeof number != "string") return false;
  return !isNaN(Number(number)) && !isNaN(parseFloat(number));
};

export const formatADAtoNumber = (ada: string): number =>
  Number(ada.replace(/[|&;$%@"<>()+, ADA]/g, ""));

export const formatStartStaking = (
  delegationPeriod: number | string
): number => {
  return typeof delegationPeriod === "number"
    ? delegationPeriod
    : Number(delegationPeriod.replace(/[|&;$%@"<>()+, Epoch]/g, ""));
};

export const isStakingAddress = (address: string): boolean =>
  address.length === 59 && address.startsWith("stake1u") ? true : false;

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

export const getStakingHistoryDict = (
  history: { active_epoch: number; amount: string }[]
): IStakingHistoryDict => {
  let stakingHistoryD: { [active_epoch: number]: number } = {};
  history.map(
    (h: { active_epoch: number; amount: string }) =>
      (stakingHistoryD[h.active_epoch] = lovelacesToADA(Number(h.amount)))
  );

  return stakingHistoryD;
};

export const getLISOIRewardsManualCalculation = (
  stakedADA: number,
  firstEpoch: number,
  angelCount: number
): ILISOIRewards => {
  let result: ILISOIRewards = {
    stakingRewards: 0,
    bonusRewards: 0,
    angelRewards: 0,
    LISOITotalRewards: 0,
    lastEpochOfLISOI: 0,
  };

  result.stakingRewards =
    stakedADA * 0.006 * 12 + angelCount * (stakedADA * 0.006 * 12);

  console.log(firstEpoch);

  // For epoch 318 the rewards are 1 cNETA : 1 ADA
  if (firstEpoch === 318) {
    result.stakingRewards += stakedADA * 1;
  }

  result.bonusRewards = stakedADA * 0.5;
  result.angelRewards = result.bonusRewards * angelCount;
  result.lastEpochOfLISOI = firstEpoch + 14;
  result.LISOITotalRewards =
    result.stakingRewards + result.bonusRewards + result.angelRewards;

  return result;
};

export const getLISOIIRewardsManualCalculation = (
  stakedADA: number,
  firstEpoch: number,
  angelCount: number,
  angelRank: number
): ILISOIIRewards => {
  let result: ILISOIIRewards = {
    angelBoostedBaseRewards: 0,
    longTermRewards: 0,
    angelBoostedLongTermRewards: 0,
    stakingRewardsTotal: 0,
    lastEpochOfLISOII: 0,
  };

  result.angelBoostedBaseRewards =
    stakedADA * 0.0075 * 24 + angelCount * (stakedADA * 0.0075 * 24);
  result.longTermRewards = stakedADA * 0.25;
  result.angelBoostedLongTermRewards = getAngelBoostedBaseRewards(
    angelRank,
    stakedADA,
    angelCount
  );
  result.stakingRewardsTotal =
    result.angelBoostedBaseRewards +
    result.longTermRewards +
    result.angelBoostedLongTermRewards;

  result.lastEpochOfLISOII = firstEpoch + 38;

  return result;
};

export const formatStakingAddressResult = (result: any) => {
  const lastElements = Array(36 - result.length).fill(result.at(-1));
  return [...result, ...lastElements];
};

export const getLISOIRewardsStakingAddress = (
  stakingHistory: any,
  firstEpoch: number,
  angelCount: number
): ILISOIRewards => {
  let result: ILISOIRewards = {
    stakingRewards: 0,
    bonusRewards: 0,
    angelRewards: 0,
    LISOITotalRewards: 0,
    lastEpochOfLISOI: 0,
  };

  stakingHistory.map((el: any, index: number) => {
    if (index <= 11) {
      result.stakingRewards +=
        lovelacesToADA(Number(el.amount)) * 0.006 +
        angelCount * (lovelacesToADA(Number(el.amount)) * 0.006);
    }

    // For epoch 318 the rewards are 1 cNETA : 1 ADA
    if (el.active_epoch === 320) {
      result.stakingRewards += lovelacesToADA(Number(el.amount)) * 1;
      result.stakingRewards -=
        lovelacesToADA(Number(el.amount)) * 0.006 +
        angelCount * (lovelacesToADA(Number(el.amount)) * 0.006);
    }

    return result.stakingRewards;
  });

  result.bonusRewards = lovelacesToADA(Number(stakingHistory[0].amount)) * 0.5;
  result.angelRewards = result.bonusRewards * angelCount;
  result.lastEpochOfLISOI = firstEpoch + 14;
  result.LISOITotalRewards =
    result.stakingRewards + result.bonusRewards + result.angelRewards;

  return result;
};

export const getLISOIIRewardsStakingAddress = (
  stakingHistory: any,
  firstEpoch: number,
  angelCount: number,
  angelRank: number
): ILISOIIRewards => {
  let result: ILISOIIRewards = {
    angelBoostedBaseRewards: 0,
    longTermRewards: 0,
    angelBoostedLongTermRewards: 0,
    stakingRewardsTotal: 0,
    lastEpochOfLISOII: 0,
  };

  stakingHistory.map((el: any, index: number) => {
    if (index >= 12 && index <= 36) {
      result.angelBoostedBaseRewards +=
        lovelacesToADA(Number(el.amount)) * 0.0075 +
        angelCount * (lovelacesToADA(Number(el.amount)) * 0.0075);
    }
    return result.angelBoostedBaseRewards;
  });
  result.longTermRewards =
    lovelacesToADA(Number(stakingHistory[13].amount)) * 0.25;
  result.angelBoostedLongTermRewards = getAngelBoostedBaseRewards(
    angelRank,
    lovelacesToADA(Number(stakingHistory[13].amount)),
    angelCount
  );
  result.stakingRewardsTotal =
    result.angelBoostedBaseRewards +
    result.longTermRewards +
    result.angelBoostedLongTermRewards;

  result.lastEpochOfLISOII = firstEpoch + 38;

  return result;
};

const getAngelBoostedBaseRewards = (
  angelRank: number,
  stakedADA: number,
  angelCount: number
): number => {
  let angelBoostedRewards = 0;
  if (angelCount > 0) {
    if (angelRank < 89) {
      angelBoostedRewards = stakedADA * 0.189;
    } else if (angelRank < 489 && angelRank > 89) {
      angelBoostedRewards = stakedADA * 0.156;
    } else if (angelRank < 1889 && angelRank > 489) {
      angelBoostedRewards = stakedADA * 0.126;
    } else if (angelRank < 4889 && angelRank > 1889) {
      angelBoostedRewards = stakedADA * 0.096;
    } else if (angelRank <= 8888 && angelRank > 4889) {
      angelBoostedRewards = stakedADA * 0.066;
    }
  } else {
    return 0;
  }

  return angelBoostedRewards;
};

export const getAngelBonusTier = (angelRank: number): number => {
  let bonusTier = 0;
  if (angelRank < 89) {
    bonusTier = 1;
  } else if (angelRank < 489 && angelRank > 89) {
    bonusTier = 2;
  } else if (angelRank < 1889 && angelRank > 489) {
    bonusTier = 3;
  } else if (angelRank < 4889 && angelRank > 1889) {
    bonusTier = 4;
  } else if (angelRank <= 8888 && angelRank > 4889) {
    bonusTier = 5;
  }

  return bonusTier;
};

const isAngelRankAndCountValid = (angelRank: number, angelCount: number) => {
  if (angelCount > 0 && angelRank > 0) {
    return true;
  } else if (Number(angelCount) === 0 && angelRank === 0) {
    return true;
  } else {
    return false;
  }
};

export const isManualCalculationFormInvalid = (
  stakedADA: number,
  firstEpoch: number,
  angelCount: number,
  angelRank: number
): boolean => {
  let isInvalid = true;

  if (
    stakedADA > 0 &&
    firstEpoch > 317 &&
    isAngelRankAndCountValid(angelRank, angelCount)
  ) {
    isInvalid = false;
  }

  return isInvalid;
};

export const isStakingAddressFormInvalid = (
  stakingAddress: string,
  angelCount: number,
  angelRank: number
): boolean => {
  let isInvalid = true;

  if (
    isStakingAddress(stakingAddress) &&
    isAngelRankAndCountValid(angelRank, angelCount)
  ) {
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

export const getDataZoom = (size: Size): any => {
  if (size) {
    if ((size.width as number) < 640) {
      return 80;
    } else if ((size.width as number) < 1024) {
      return 50;
    } else {
      return 0;
    }
  }
};


// curl -H "project_id: mainnetJyhaAWMYuZAhpPPpPcslIX0LNMfwtjOK"         https://cardano-mainnet.blockfrost.io/api/v0/pools/pool15hx9hze8ulcsw6e7ceelz2pem2g3u9c29wqe4eszkhspj3wcdlx/delegators

// stake1u839y9md6svrugfsfkfy2zhy9rs3lsvdu30mvhrtvlzcjdqjt8un4