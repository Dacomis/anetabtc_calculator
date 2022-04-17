import NumberFormat from "react-number-format";

const LISOI = ({ LISOIRewards }: any) => {
  return (
    <div className="relative my-2 flex flex-col text-lg text-fuchsia-900/80 shadow shadow-fuchsia-100/50 placeholder:text-fuchsia-900/80 lg:p-4">
      <div className="absolute -top-9 left-1/2 z-10 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg border-fuchsia-300 bg-fuchsia-400/40 px-4 py-1 font-chicle text-fuchsia-900 shadow-2xl">
        <span className="text-6xl">LISO I</span>
        <span className="mx-auto text-3xl text-fuchsia-900/90">Rewards</span>
      </div>

      <fieldset className="mb-4 mt-7 flex items-center justify-between md:w-96 lg:w-[300px]">
        <label className="w-40 text-base text-fuchsia-900/70 lg:w-72">
          Staking Rewards:
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-fuchsia-50 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-100 focus:shadow-fuchsia-700/70 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIRewards.stakingRewards}
          displayType="text"
        />
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[300px]">
        <label className="w-40 text-base text-fuchsia-900/70 lg:w-72">
          Bonus Rewards:
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-fuchsia-50 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-100 focus:shadow-fuchsia-700/70 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIRewards.bonusRewards}
          displayType="text"
        />
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[300px]">
        <label className="w-40 text-base text-fuchsia-900/70 lg:w-72">
          Angel Boosted Rewards:
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-fuchsia-50 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-100 focus:shadow-fuchsia-700/80 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIRewards.angelRewards}
          displayType="text"
        />
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[300px]">
        <label className="w-40 text-base text-fuchsia-900/80 lg:w-72">
          <strong>Staking Rewards Total:</strong>
        </label>
        <NumberFormat
          decimalScale={2}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-32 rounded-lg border border-fuchsia-50 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-100 focus:shadow-fuchsia-800/80 focus:outline-none md:w-80 lg:w-52"
          min={1}
          value={LISOIRewards.LISOITotalRewards}
          displayType="text"
        />
      </fieldset>

      <span className="flex flex-row text-right text-sm">
        Effective at the end of Epoch {LISOIRewards.lastEpochOfLISOI}
      </span>
    </div>
  );
};

export default LISOI;
