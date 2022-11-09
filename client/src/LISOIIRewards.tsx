import NumberFormat from "react-number-format";
import { QuestionMarkCircle } from "./images/QuestionMarkCircle";

const LISOII = ({ LISOIIRewards }: any) => {
  return (
    <div className="relative my-2 flex flex-col text-lg text-orange-900 placeholder:text-orange-900/80 lg:p-4">
      <div className="absolute -top-7 left-1/2 z-10 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg border-orange-300 bg-orange-400/40 px-4 py-1 text-orange-900 shadow-2xl">
        <span className="text-center text-4xl">LISO II</span>
        <span className="mx-auto text-3xl text-orange-900/90">Rewards</span>
      </div>

      <fieldset className="mb-4 mt-7 flex items-center justify-between md:w-96 lg:w-[500px]">
        <label className="w-6/12 text-base text-orange-900/70 md:w-11/12">
          Angel Boosted Base Rewards:
        </label>
        <NumberFormat
          decimalScale={0}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-5/12 rounded-lg border border-teal-50 bg-teal-100/75 px-2 text-right focus:border-teal-900 focus:shadow-orange-800/80 focus:outline-none md:w-7/12"
          min={1}
          value={LISOIIRewards.angelBoostedBaseRewards}
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
                <strong>No Aneta Angel</strong> →{" "}
                <strong>0.0075 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>1 Aneta Angel (10% boost)</strong> →{" "}
                <strong>0.00825 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>2 Aneta Angels (12.5% boost)</strong> →{" "}
                <strong>0.0084375 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>3+ Aneta Angels (15% boost)</strong> →{" "}
                <strong>0.008625 cNETA: 1 ADA</strong>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[500px]">
        <label className="w-6/12 text-base text-orange-900/70 md:w-11/12">
          Long Term Rewards:
        </label>
        <NumberFormat
          decimalScale={0}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-5/12 rounded-lg border border-teal-50 bg-teal-100/75 px-2 text-right focus:border-teal-900 focus:shadow-orange-800/80 focus:outline-none md:w-7/12"
          min={1}
          value={LISOIIRewards.longTermRewards}
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
                <strong>0.25 cNETA: 1 ADA</strong>
                <br />
                for delegating <strong>6 months consecutively</strong>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[500px]">
        <label className="w-6/12 text-base text-orange-900/70 md:w-11/12">
          Angel Boosted Long Term Rewards:
        </label>
        <NumberFormat
          decimalScale={0}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-5/12 rounded-lg border border-teal-50 bg-teal-100/75 px-2 text-right focus:border-teal-900 focus:shadow-orange-800/80 focus:outline-none md:w-7/12"
          min={1}
          value={LISOIIRewards.angelBoostedLongTermRewards}
          displayType="text"
        />
        <div className="group relative flex flex-col items-center">
          <QuestionMarkCircle />
          <div className="absolute top-1/2 mr-12 hidden -translate-x-1/2 -translate-y-1/2 transform flex-col items-center group-hover:z-20 group-hover:flex md:top-6 md:mb-6 md:mr-0 md:-translate-x-0 md:-translate-y-0">
            <div className="hidden w-3 overflow-hidden md:inline-block">
              <div className="h-2 w-2 origin-bottom-left rotate-45 transform bg-black bg-opacity-70"></div>
            </div>{" "}
            <div className="whitespace-no-wrap relative z-10 min-w-max rounded-lg bg-black bg-opacity-70 p-2 text-center text-xs leading-none text-white shadow-lg">
              <div className="my-1">
                <strong>Tier 1:</strong> Rarity 1–88 →{" "}
                <strong>0.189 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>Tier 2:</strong> Rarity 89–488 →{" "}
                <strong>0.156 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>Tier 3:</strong> Rarity 489–1,888 →{" "}
                <strong>0.126 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>Tier 4:</strong> Rarity 1,889–4,888 →{" "}
                <strong>0.096 cNETA: 1 ADA</strong>
              </div>
              <br />
              <div className="mb-1">
                <strong>Tier 5:</strong> Rarity 4,889–8,888 →{" "}
                <strong>0.066 cNETA: 1 ADA</strong>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-4 flex items-center justify-between md:w-96 lg:w-[500px]">
        <label className="w-6/12 text-base text-orange-900/70 md:w-11/12">
          <strong>Staking Rewards Total:</strong>
        </label>
        <NumberFormat
          decimalScale={0}
          thousandSeparator
          suffix={" cNETA"}
          className="input w-5/12 rounded-lg border border-teal-50 bg-teal-100/75 px-2 text-right focus:border-teal-900 focus:shadow-orange-800/80 focus:outline-none md:w-7/12"
          min={1}
          value={LISOIIRewards.stakingRewardsTotal}
          displayType="text"
        />
        <div className="invisible">
          <QuestionMarkCircle />
        </div>
      </fieldset>

      <span className="flex flex-row text-right text-sm">
        Effective at the end of Epoch {LISOIIRewards.lastEpochOfLISOII}
      </span>
    </div>
  );
};

export default LISOII;
