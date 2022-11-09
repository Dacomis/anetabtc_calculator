import {
  getPort,
  getLISOIRewardsStakingAddress,
  getAngelBonusTier,
  isStakingAddressFormInvalid,
  firstNEpochs,
  getLISOIIRewardsStakingAddress,
} from "./utils/Utils";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

type Props = {
  setLISOIRewards: Function;
  setLISOIIRewards: Function;
  manuallyCalculate: boolean;
};

const StakingAddressForm = ({
  setLISOIRewards,
  setLISOIIRewards,
  manuallyCalculate,
}: Props) => {
  const [stakingAddress, setStakingAddress] = useState("");
  const [stakingAddressError, setStakingAddressError] = useState(false);
  const [angelCount, setAngelCount] = useState(0);
  const [angelRank, setAngelRank] = useState(0);

  const [addresses, setAddresses] = useState(0);

  useEffect(() => {
    const refreshStakingAddressForm = () => {
      setStakingAddress("");
      setAngelCount(0);
      return setAngelRank(0);
    };
    refreshStakingAddressForm();
  }, [manuallyCalculate]);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (stakingAddress) {
      // fetch(`http://localhost:3001/api/delegatorHistory/${stakingAddress}`)
      fetch(`${getPort()}/delegatorHistory/${stakingAddress}`)
        .then((res) => res.json())
        .then((result) => {
          setStakingAddressError(false);

          const firstEpoch = result[0].active_epoch;
          const formattedResult = firstNEpochs(result, 36);
          console.log(`formattedResult`, formattedResult);

          setLISOIRewards(
            getLISOIRewardsStakingAddress(
              formattedResult,
              firstEpoch,
              angelCount
            )
          );

          setLISOIIRewards(
            getLISOIIRewardsStakingAddress(
              formattedResult,
              firstEpoch,
              angelCount,
              angelRank
            )
          );
        })
        .catch((error) => {
          console.log(error);

          setStakingAddressError(true);
        });

      // fetch(`${getPort()}/${angelsPolicyID}`)
      fetch(`http://localhost:3001/api/${stakingAddress}/addresses`)
        .then((res) => res.json())
        .then(
          (res) => {
            console.log(res);
            setAddresses(res);
          },
          (err) => console.log(err)
        );
    }
  };

  return (
    <form className="flex flex-col items-center lg:p-4" onSubmit={onSubmit}>
      <div className="text-lg text-cyan-900 placeholder:text-cyan-900/80">
        <fieldset className="mx-auto mb-4 flex w-10/12 flex-col md:w-96 lg:w-[300px]">
          <label className="text-base text-cyan-900/80">Staking Address:</label>
          <input
            className="input h-8 rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none lg:min-w-[90%]  2xl:w-[500px]"
            value={stakingAddress}
            onChange={(e: any) => setStakingAddress(e.target.value)}
          />
        </fieldset>

        <fieldset
          className={`${
            (angelRank < 0 || angelRank > 8888) && "mx-auto w-11/12 px-1"
          } mb-4 flex flex-col`}
        >
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
              0 Angels
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
            decimalScale={0}
            className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none md:w-96 lg:w-[300px]  2xl:w-[500px]"
            value={angelRank}
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
            <span
              className={`${
                angelRank > 0 && angelRank <= 8888 ? "visible" : "hidden"
              }`}
            >
              <strong>Bonus Tier {getAngelBonusTier(angelRank)}</strong>
            </span>
            <div className={`${angelRank === 0 ? "h-5" : "hidden"}`}></div>
            <span
              className={`${
                angelRank < 0 || angelRank > 8888 ? "visible" : "hidden"
              }`}
            >
              <span className="flex flex-row text-sm text-red-600">
                Angel Ranking must be between 1 and 8888
              </span>
            </span>
          </div>
        </fieldset>
      </div>

      <button
        className="rounded-lg border-indigo-300 bg-teal-900 px-4 py-1 text-xl text-teal-100 shadow-2xl disabled:text-gray-500 disabled:opacity-50"
        type="submit"
        disabled={isStakingAddressFormInvalid(
          stakingAddress,
          angelCount,
          angelRank
        )}
      >
        Calculate
      </button>

      {stakingAddressError && (
        <span className="mx-auto mb-4 mt-4 flex w-10/12 flex-row text-center text-sm text-red-600 md:w-96 lg:w-[300px]">
          This Staking Address is invalid or the Staking Rewards could not be
          retrieved
        </span>
      )}
    </form>
  );
};

export default StakingAddressForm;
