import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  formatADAtoNumber,
  formatDelegationPeriod,
  isFormInvalid,
  isStakingAddressOrEmpty,
  stakedADADict,
} from "./utils/Utils";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { FormInputs } from "./interfaces/interfaces";

const defaultValues: FormInputs = {
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
  const { control, register, handleSubmit, formState, getValues } =
    useForm<FormInputs>({
      mode: "onChange",
      defaultValues,
    });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
                min={1}
              />
            )}
            name="stakedADA"
            control={control}
            rules={{
              validate: (value) =>
                Number(value.toString().replace(/[|&;$%@"<>()+, ADA]/g, "")) >=
                0
                  ? true
                  : false,
            }}
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
              validate: (value) => isStakingAddressOrEmpty(value),
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

      <input
        className="disabled:bg-indigo-500"
        type="submit"
        disabled={isFormInvalid(formState, getValues())}
      />
    </form>
  );
};

export default Form;
