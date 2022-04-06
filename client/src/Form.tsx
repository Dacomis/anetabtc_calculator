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
      <div
        className="text-lg text-cyan-900 shadow
                shadow-cyan-100/50 placeholder:text-cyan-900/80"
      >
        <fieldset className="mb-4 flex flex-col">
          <label className="text-base text-cyan-900/80">Staked ADA:</label>
          <Controller
            render={({ field }) => (
              <NumberFormat
                {...field}
                thousandSeparator
                suffix={" ADA"}
                className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none"
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
        </fieldset>

        <fieldset className="mb-4 flex flex-col">
          <label className="text-base text-cyan-900/80">
            Delegation Period:
          </label>
          <Controller
            render={({ field }) => (
              <NumberFormat
                {...field}
                className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none"
                suffix={
                  formatDelegationPeriod(getValues("delegationPeriod")) === 1
                    ? " epoch"
                    : " epochs"
                }
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
          <div className="mx-1 flex justify-between text-sm">
            <span>until Epoch {currentEpoch + delegationPeriod}</span>
            <span>current Epoch {currentEpoch}</span>
          </div>
        </fieldset>

        <fieldset className="mb-4 flex flex-col">
          <label className="text-base text-cyan-900/80">Staking Address:</label>
          <input
            {...register("stakingAddress", {
              validate: (value) => isStakingAddressOrEmpty(value),
            })}
            className="input h-8 overflow-clip rounded-lg border border-cyan-50 bg-teal-100/75 px-2 text-base focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none"
            placeholder="eg: stake1u..."
          />
        </fieldset>

        <fieldset className="mb-4 flex flex-col">
          <label className="text-base text-cyan-900/80">Staking NFTs:</label>
          <select
            {...register("NFTsSelect")}
            className="input h-8 overflow-clip rounded-lg border border-cyan-50 bg-teal-100/75 px-2 text-base focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none"
          >
            <option
              value="0"
              className="block border-b px-4 py-2 text-sm hover:bg-gray-200"
            >
              O NFTs
            </option>
            <option
              value="0.1"
              className="block border-b px-4 py-2 text-sm hover:bg-gray-200"
            >
              1 NFT
            </option>
            <option
              value="0.125"
              className="block border-b px-4 py-2 text-sm hover:bg-gray-200"
            >
              2 NFTs
            </option>
            <option
              value="0.15"
              className="block border-b px-4 py-2 text-sm  hover:bg-gray-200"
            >
              3 NFTs
            </option>
          </select>
        </fieldset>
      </div>

      <button
        className="rounded-lg border-indigo-300 bg-teal-900 px-4 py-1 text-xl text-teal-100 shadow-2xl disabled:text-gray-500 disabled:opacity-50"
        type="submit"
        disabled={isFormInvalid(formState, getValues())}
      >
        Calculate
      </button>
    </form>
  );
};

export default Form;
