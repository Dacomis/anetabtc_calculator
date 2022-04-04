import {
  Controller,
  NestedValue,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  formatADAtoNumber,
  formatDelegationPeriod,
  isStakingAddress,
  stakedADADict,
} from "./utils/Utils";
import NumberFormat from "react-number-format";
import { useState } from "react";

type Inputs = {
  stakedADA: number;
  delegationPeriod: number;
  stakingAddress: string;
  NFTsSelect: NestedValue<{ value: string; label: string }> | number;
};
const defaultValues = {
  stakedADA: 0,
  delegationPeriod: 20,
  stakingAddress: "",
  NFTsSelect: { value: "0", label: "0 NFTs" },
};

type Props = {
  setStakingAddress: Function;
  setStakedADA: Function;
  currentEpoch: number;
};

const Form = ({ setStakingAddress, setStakedADA, currentEpoch }: Props) => {
  const [delegationPeriod, setDelegationPeriod] = useState(20);
  const { control, register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setStakingAddress(data.stakingAddress);
    data.stakedADA = formatADAtoNumber(data.stakedADA.toString());
    data.delegationPeriod = formatDelegationPeriod(data.delegationPeriod);
    data.NFTsSelect = Number(data.NFTsSelect);
    setStakedADA(
      stakedADADict(currentEpoch + 1, data.delegationPeriod, data.stakedADA)
    );
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <section>
          <label>Staked ADA:</label>
          <Controller
            render={({ field }) => (
              <NumberFormat
                {...field}
                thousandSeparator
                suffix={" ADA"}
                className="input"
                value={field.value}
              />
            )}
            name="stakedADA"
            control={control}
          />
        </section>

        <section>
          <label>Delegation Period:</label>
          <Controller
            render={({ field }) => (
              <NumberFormat
                {...field}
                className="input"
                suffix=" epochs"
                defaultValue={20}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setDelegationPeriod(Number(value));
                }}
              />
            )}
            name="delegationPeriod"
            control={control}
          />
          <span>until Epoch {currentEpoch + delegationPeriod}</span>
        </section>

        <section>
          <label>Staking Address:</label>
          <input
            {...register("stakingAddress", {
              validate: (value) => isStakingAddress(value),
            })}
            placeholder="eg: stake1u..."
          />
        </section>

        <section>
          <label>Staking NFTs:</label>
          <select {...register("NFTsSelect")}>
            <option value="0">O NFTs</option>
            <option value="0.1">1 NFT</option>
            <option value="0.125">2 NFTs</option>
            <option value="0.15">3 NFTs</option>
          </select>
        </section>
      </div>

      <input type="submit" disabled={!formState.isValid} />
    </form>
  );
};

export default Form;
