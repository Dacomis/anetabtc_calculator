import {
  formatADAtoNumber,
  formatDelegationPeriod,
  isFormInvalid,
  rewardsPerEpoch,
  stakedADADict,
  stakingHistoryDict,
  totalRewards,
} from "./utils/Utils";
import { useState } from "react";
import NumberFormat from "react-number-format";

type Props = {
  currentEpoch: number;
  setRewards: Function;
  setRewardsPerEpoch: Function;
  setEpochs: Function;
};

const Form = ({
  currentEpoch,
  setRewards,
  setRewardsPerEpoch,
  setEpochs,
}: Props) => {
  const [stakedADA, setStakedADA] = useState("");
  const [delegationPeriod, setDelegationPeriod] = useState(20);
  const [stakingAddress, setStakingAddress] = useState("");
  const [selectNFT, setSelectNFT] = useState("");

  //TODO
  const [delegatorHistoryError, setDelegatorHistoryError] = useState(null);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const stakedADAFormatted = formatADAtoNumber(stakedADA);
    const delegationPeriodFormatted = formatDelegationPeriod(delegationPeriod);
    const NFTsSelect = Number(selectNFT);

    let rewardsDict = {};

    let stakedADAD = stakedADADict(
      currentEpoch,
      delegationPeriodFormatted,
      stakedADAFormatted
    );

    if (!stakingAddress) {
      setRewards(totalRewards(stakedADAD, NFTsSelect));
      setRewardsPerEpoch(rewardsPerEpoch(stakedADAD, NFTsSelect));
      setEpochs(stakedADAD);
    } else {
      fetch(`http://localhost:5000/api/delegatorHistory/${stakingAddress}`)
        .then((res) => res.json())
        .then((result) => {
          const stakingHistoryD = stakingHistoryDict(result);

          rewardsDict = Object.assign({}, stakingHistoryD, stakedADAD);
          setRewards(totalRewards(rewardsDict, NFTsSelect));
          setRewardsPerEpoch(rewardsPerEpoch(rewardsDict, NFTsSelect));
          setEpochs(rewardsDict);
        })
        .catch((error) => {
          setDelegatorHistoryError(delegatorHistoryError);
          //setError afisare //TODO
        });
    }
  };

  //TODO
  // const stakedADAHandler = (inputValue: string) => {
  //   const formattedValue = formatADAtoNumber(inputValue);
  // if (!isNumber(formattedValue.toString())) {
  //   return; // adica nu mai face nimic
  // }
  //   setStakedADA(formattedValue.toString());
  // };

  return (
    <form className="flex flex-col items-center lg:p-4" onSubmit={onSubmit}>
      <div
        className="text-lg text-cyan-900 shadow
                shadow-cyan-100/50 placeholder:text-cyan-900/80"
      >
        <fieldset className="mb-4 flex flex-col md:w-96 lg:w-[300px]">
          <label className="text-base text-cyan-900/80">Staked ADA:</label>
          <NumberFormat
            thousandSeparator
            suffix={" ADA"}
            className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none lg:min-w-[90%]  2xl:w-[500px]"
            value={stakedADA}
            onChange={(e: any) =>
              setStakedADA(formatADAtoNumber(e.target.value).toString())
            }
            min={1}
          />
        </fieldset>

        <fieldset className="mb-4 flex flex-col">
          <label className="text-base text-cyan-900/80">
            Delegation Period:
          </label>
          <NumberFormat
            className="input h-8 overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 px-2 focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none md:w-96 lg:w-[300px]  2xl:w-[500px]"
            suffix={
              formatDelegationPeriod(delegationPeriod) === 1
                ? " epoch"
                : " epochs"
            }
            defaultValue={20}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setDelegationPeriod(Number(value));
            }}
          />
          <div className="mx-1 flex justify-between text-sm">
            <span>until Epoch {currentEpoch + delegationPeriod}</span>
            <span>current Epoch {currentEpoch}</span>
          </div>
        </fieldset>

        <fieldset className="mb-4 flex flex-col">
          <label className="text-base text-cyan-900/80">Staking Address:</label>
          <input
            value={stakingAddress}
            className="input h-8 overflow-clip rounded-lg border border-cyan-50 bg-teal-100/75 px-2 text-base focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none md:w-96 lg:w-[300px]  2xl:w-[500px]"
            placeholder="eg: stake1u..."
            onChange={(e: any) => setStakingAddress(e.target.value)}
          />
        </fieldset>

        <fieldset className="mb-4 flex flex-col">
          <label className="text-base text-cyan-900/80">Staking NFTs:</label>
          <select
            value={selectNFT}
            className="input h-8 overflow-clip rounded-lg border border-cyan-50 bg-teal-100/75 px-2 text-base focus:border-cyan-100 focus:shadow-cyan-800/80 focus:outline-none md:w-96 lg:w-[300px]  2xl:w-[500px]"
            onChange={(e: any) => setSelectNFT(e.target.value)}
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
        disabled={isFormInvalid(stakingAddress, stakedADA)}
      >
        Calculate
      </button>
    </form>
  );
};

export default Form;
