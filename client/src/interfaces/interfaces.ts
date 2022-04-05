import { NestedValue } from "react-hook-form";

export interface PoolsHistoryEpoch {
  epoch: number;
  active_stake: number;
  delegators_count: number;
}

export interface FormInputs {
  stakedADA: number;
  delegationPeriod: number;
  stakingAddress: string;
  NFTsSelect:
    | NestedValue<{ value: string; label: string }>
    | { value: string; label: string }
    | number;
}

export enum CalculatorType {
  StakedADA = "StakedADA",
  StakingAddress = "StakingAddress",
}
