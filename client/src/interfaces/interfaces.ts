export interface PoolsHistoryEpoch {
  epoch: number;
  active_stake: number;
  delegators_count: number;
}

export enum CalculatorType {
  StakedADA = "StakedADA",
  StakingAddress = "StakingAddress",
}