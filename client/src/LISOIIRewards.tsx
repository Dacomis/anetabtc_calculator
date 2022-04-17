import NumberFormat from "react-number-format";

const LISOII = ({ LISOIIRewards }: any) => {
  return (
    <div className="relative my-2 flex flex-col text-lg text-orange-900 shadow shadow-orange-100/50 placeholder:text-orange-900/80 lg:p-4">
      <div className="absolute -top-9 left-1/2 z-10 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg border-orange-300 bg-orange-400/40 px-4 py-1 font-chicle text-orange-900 shadow-2xl">
        <span className="text-6xl">LISO II</span>
        <span className="mx-auto text-3xl text-orange-900/90">Rewards</span>
      </div>

      <fieldset className="mb-4 mt-7 flex items-center justify-between md:w-96 lg:w-96">
        <label className="w-40 text-base text-orange-900/80 lg:w-72">
          Angel Boosted Base Rewards:
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-orange-50 bg-teal-100/75 px-2 text-right focus:border-orange-100 focus:shadow-orange-800/80 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIIRewards.angelBoostedBaseRewards}
          displayType="text"
        />
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-96">
        <label className="w-40 text-base text-orange-900/80 lg:w-72">
          Long Term Rewards:
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-orange-50 bg-teal-100/75 px-2 text-right focus:border-orange-100 focus:shadow-orange-800/80 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIIRewards.longTermRewards}
          displayType="text"
        />
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-96">
        <label className="w-40 text-base text-orange-900/80 lg:w-72">
          Angel Boosted Long Term Rewards:
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-orange-50 bg-teal-100/75 px-2 text-right focus:border-orange-100 focus:shadow-orange-800/80 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIIRewards.angelBoostedLongTermRewards}
          displayType="text"
        />
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-96">
        <label className="w-40 text-base text-orange-900/80 lg:w-72">
          <strong>Staking Rewards Total:</strong>
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-orange-50 bg-teal-100/75 px-2 text-right focus:border-orange-100 focus:shadow-orange-800/80 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIIRewards.stakingRewardsTotal}
          displayType="text"
        />
      </fieldset>

      <span className="flex flex-row text-right text-sm">
        Effective at the end of Epoch {LISOIIRewards.lastEpochOfLISOII}
      </span>
    </div>
  );
};

export default LISOII;
