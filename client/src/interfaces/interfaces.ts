export interface PoolsHistoryEpoch {
  epoch: number;
  active_stake: number;
  delegators_count: number;
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export interface ILISOIRewards {
  stakingRewards: number;
  angelBoostedBaseRewards: number;
  bonusRewards: number;
  angelsBoostedLongTermRewards: number;
  firstEpochBonusRewards: number;
  LISOITotalRewards: number;
  lastEpochOfLISOI: number;
}

export interface ILISOIIRewards {
  angelBoostedBaseRewards: number;
  longTermRewards: number;
  angelBoostedLongTermRewards: number;
  stakingRewardsTotal: number;
  lastEpochOfLISOII: number;
}

export interface IStakingHistoryDict {
  [active_epoch: number]: number;
}