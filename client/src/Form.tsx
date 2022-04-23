import {
  formatADAtoNumber,
  formatStartStaking,
  getLISOIRewards,
  getLISOIIRewards,
  getAngelBonusTier,
  isFormInvalid,
} from "./utils/Utils";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { ExclamationCircle } from "./images/ExclamationCircle";

type Props = {
  currentEpoch: number;
  setLISOIRewards: Function;
  setLISOIIRewards: Function;
};

const Form = ({ currentEpoch, setLISOIRewards, setLISOIIRewards }: Props) => {
  const [stakedADA, setStakedADA] = useState(0);
  const [startStakingEpoch, setStartStakingEpoch] = useState(0);
  const [angelCount, setAngelCount] = useState(0);
  const [angelRank, setAngelRank] = useState(0);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setLISOIRewards(getLISOIRewards(stakedADA, startStakingEpoch, angelCount));
    setLISOIIRewards(
      getLISOIIRewards(stakedADA, startStakingEpoch, angelCount, angelRank)
    );
  };

  return (
    <form className="flex flex-col items-center lg:p-4" onSubmit={onSubmit}>
      <div
        className="text-lg text-cyan-900 shadow
                shadow-cyan-100/50 placeholder:text-cyan-900/80"
      >
        <fieldset className="mx-auto mb-4 flex w-10/12 flex-col md:w-96 lg:w-[300px]">
          <label className="text-base text-cyan-900/80">Staked ADA:</label>
          <NumberFormat
            decimalScale={2}
            thousandSeparator
            suffix={" ADA"}
            className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none lg:min-w-[90%]  2xl:w-[500px]"
            value={stakedADA}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setStakedADA(formatADAtoNumber(value));
            }}
            min={1}
          />
        </fieldset>

        <fieldset className="mx-auto mb-4 flex w-10/12 flex-col">
          <label className="text-base text-cyan-900/80">
            Epoch in which the staking started:
          </label>
          <NumberFormat
            decimalScale={2}
            className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none md:w-96 lg:w-[300px]  2xl:w-[500px]"
            prefix={"Epoch "}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setStartStakingEpoch(formatStartStaking(value));
            }}
            min={318}
          />
          {startStakingEpoch > 0 && startStakingEpoch < 318 && (
            <span className="flex flex-row text-sm text-red-600">
              <ExclamationCircle />
              The starting epoch cannot be earlier than Epoch 318
            </span>
          )}
          {startStakingEpoch > 0 && (
            <span className="text-sm">
              rewards from <strong>Epoch {startStakingEpoch + 2}</strong>
            </span>
          )}
          {currentEpoch > 0 && (
            <span className="text-sm">
              current <strong>Epoch {currentEpoch}</strong>
            </span>
          )}
        </fieldset>

        <fieldset className={"w-12/12 mb-4 flex flex-col"}>
          <label className="text-base text-cyan-900/80">Angel Count:</label>
          <select
            value={angelCount}
            className="input h-8 overflow-clip rounded-lg border border-cyan-50 bg-teal-100/75 text-base focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none md:w-96 lg:w-[300px]  2xl:w-[500px]"
            onChange={(e: any) => setAngelCount(e.target.value)}
          >
            <option
              value="0"
              className="block border-b px-4 py-2 text-sm hover:bg-gray-200"
            >
              O Angels
            </option>
            <option
              value="0.1"
              className="block border-b px-4 py-2 text-sm hover:bg-gray-200"
            >
              1 Angel
            </option>
            <option
              value="0.125"
              className="block border-b px-4 py-2 text-sm hover:bg-gray-200"
            >
              2 Angels
            </option>
            <option
              value="0.15"
              className="block border-b px-4 py-2 text-sm  hover:bg-gray-200"
            >
              3+ Angels
            </option>
          </select>
        </fieldset>

        <fieldset className="mx-auto mb-4 flex w-10/12 flex-col">
          <label className="text-base text-cyan-900/80">
            Highest Angel Ranking (by tier):
          </label>
          <NumberFormat
            decimalScale={2}
            className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none md:w-96 lg:w-[300px]  2xl:w-[500px]"
            onChange={(e: any) => setAngelRank(Number(e.target.value))}
            min={1}
          />
          <div className="mx-1 flex flex-col text-sm">
            <span>
              Get your Angels rank from {""}
              <a
                target="_blank"
                className="rounded-lg bg-blue-100 px-1 text-cardanoBlue text-opacity-80 hover:bg-blue-200 hover:text-cardanoBlue"
                rel="noopener noreferrer"
                href="https://cnft.tools/anetaangels"
              >
                <strong>CNFT Tools</strong>
              </a>
            </span>
            <span className={`${angelRank > 0 ? "visible" : "invisible"}`}>
              <strong>Bonus Tier {getAngelBonusTier(angelRank)}</strong>
            </span>
          </div>
        </fieldset>
      </div>

      <button
        className="rounded-lg border-indigo-300 bg-teal-900 px-4 py-1 text-xl text-teal-100 shadow-2xl disabled:text-gray-500 disabled:opacity-50"
        type="submit"
        disabled={isFormInvalid(
          stakedADA,
          startStakingEpoch,
          angelCount,
          angelRank
        )}
      >
        Calculate
      </button>
    </form>
  );
};

export default Form;

