import NumberFormat from "react-number-format";
import { QuestionMarkCircle } from "./images/QuestionMarkCircle";

const LISOI = ({ LISOIRewards }: any) => {
  return (
    <div className="relative my-2 flex flex-col text-lg text-fuchsia-900/80 placeholder:text-fuchsia-900/80 lg:p-4">
      <div className="absolute -top-7 left-1/2 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg border-fuchsia-300 bg-fuchsia-400/40 px-4 py-1 text-fuchsia-900 shadow-2xl">
        <span className="text-center text-4xl">LISO I</span>
        <span className="mx-auto text-3xl text-fuchsia-900/90">Rewards</span>
      </div>

      <fieldset className="mb-4 mt-7 flex items-center justify-between md:w-96 lg:w-[500px]">
        <label className="w-6/12 text-base text-fuchsia-900/70 md:w-11/12">
          Base Rewards:
        </label>
        <NumberFormat
          decimalScale={0}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-5/12 rounded-lg border border-fuchsia-100 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-200 focus:shadow-fuchsia-700/70 focus:outline-none md:w-7/12"
          min={1}
          value={LISOIRewards.stakingRewards}
          displayType="text"
        />
        <div className="group relative flex flex-col items-center">
          <QuestionMarkCircle />
          <div className="absolute top-1/2 mr-12 hidden -translate-x-1/2 -translate-y-1/2 transform flex-col items-center group-hover:z-20 group-hover:flex md:top-6 md:mb-6 md:mr-0 md:-translate-x-0 md:-translate-y-0">
            <div className="hidden w-3 overflow-hidden md:inline-block">
              <div className="h-2 w-2 origin-bottom-left rotate-45 transform bg-black bg-opacity-70"></div>
            </div>
            <div className="whitespace-no-wrap relative z-10 min-w-max rounded-lg bg-black bg-opacity-70 p-2 text-center text-xs leading-none text-white shadow-lg">
              <div className="my-1">
                <strong>Base rewards</strong> →{" "}
                <strong>0.006 cNETA: 1 ADA</strong>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[500px]">
        <label className="w-6/12 text-base text-fuchsia-900/70 md:w-11/12">
          Angel Boosted Base Rewards:
        </label>
        <NumberFormat
          decimalScale={0}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-5/12 rounded-lg border border-fuchsia-100 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-200 focus:shadow-fuchsia-700/70 focus:outline-none md:w-7/12"
          min={1}
          value={LISOIRewards.angelBoostedBaseRewards}
          displayType="text"
        />
        <div className="group relative flex flex-col items-center">
          <QuestionMarkCircle />
          <div className="absolute top-1/2 mr-12 hidden -translate-x-1/2 -translate-y-1/2 transform flex-col items-center group-hover:z-20 group-hover:flex md:top-6 md:mb-6 md:mr-0 md:-translate-x-0 md:-translate-y-0">
            <div className="hidden w-3 overflow-hidden md:inline-block">
              <div className="h-2 w-2 origin-bottom-left rotate-45 transform bg-black bg-opacity-70"></div>
            </div>
            <div className="whitespace-no-wrap relative z-10 min-w-max rounded-lg bg-black bg-opacity-70 p-2 text-center text-xs leading-none text-white shadow-lg">
              <div className="my-1">
                <strong>1 Aneta Angel</strong> →{" "}
                <strong>0.0066 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>2 Aneta Angels</strong> →{" "}
                <strong>0.00675 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>3+ Aneta Angels</strong> →{" "}
                <strong>0.0069 cNETA: 1 ADA</strong>
              </div>
              <br />
            </div>
          </div>
        </div>
      </fieldset>

      {LISOIRewards.firstEpochBonusRewards > 0 && (
        <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[500px]">
          <label className="w-6/12 text-base text-fuchsia-900/70 md:w-11/12">
            First Epoch Rewards:
          </label>
          <NumberFormat
            decimalScale={0}
            thousandSeparator
            suffix={" cNETA"}
            className="input w-5/12 rounded-lg border border-fuchsia-100 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-200 focus:shadow-fuchsia-700/70 focus:outline-none md:w-7/12"
            min={1}
            value={LISOIRewards.firstEpochBonusRewards}
            displayType="text"
          />
          <div className="group relative flex flex-col items-center">
            <QuestionMarkCircle />
            <div className="absolute top-1/2 mr-12 hidden -translate-x-1/2 -translate-y-1/2 transform flex-col items-center group-hover:z-20 group-hover:flex md:top-6 md:mb-6 md:mr-0 md:-translate-x-0 md:-translate-y-0">
              <div className="hidden w-3 overflow-hidden md:inline-block">
                <div className="h-2 w-2 origin-bottom-left rotate-45 transform bg-black bg-opacity-70"></div>
              </div>
              <div className="whitespace-no-wrap relative z-10 min-w-max rounded-lg bg-black bg-opacity-70 p-2 text-center text-xs leading-none text-white shadow-lg">
                <div className="my-1">
                  For <strong>Epoch 318</strong> the rewards are <br />
                  <strong>1 cNETA : 1 ADA</strong>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      )}

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[500px]">
        <label className="w-6/12 text-base text-fuchsia-900/80 md:w-11/12">
          <strong>Staking Rewards Total:</strong>
        </label>
        <NumberFormat
          decimalScale={0}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-5/12 rounded-lg border border-fuchsia-100 bg-fuchsia-100/75 px-2 text-right focus:border-fuchsia-200 focus:shadow-fuchsia-800/80 focus:outline-none md:w-7/12"
          min={1}
          value={LISOIRewards.LISOITotalRewards}
          displayType="text"
        />
        <div className="invisible">
          <QuestionMarkCircle />
        </div>
      </fieldset>

      <span className="flex flex-row text-right text-sm">
        Effective at the end of Epoch {LISOIRewards.lastEpochOfLISOI}
      </span>
    </div>
  );
};

export default LISOI;
