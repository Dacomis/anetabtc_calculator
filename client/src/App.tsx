import { useEffect, useState } from "react";
import Stakers from "./Delegators";
import LineAndBarGraph from "./LineAndBarChart";
import TotalADAStaked from "./TotalADAStaked";
import { stakingHistoryDict, totalRewards } from "./utils/Utils";
import { Footer } from "./Footer";
import { Header } from "./Header";
import Form from "./Form";

function App() {
  const [rewards, setRewards] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [animationEffect, setAnimationEffect] = useState(false);
  const [stakingAddress, setStakingAddress] = useState("");
  const [stakedADA, setStakedADA] = useState<{
    [active_epoch: number]: number;
  }>({});
  const [stakingHistory, setStakingHistory] = useState<{
    [active_epoch: number]: number;
  }>({});

  // pools stake and delegators history
  const [historyError, setHistoryError] = useState(null);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const [history, setHistory] = useState([]);
  const [delegatorHistoryError, setDelegatorHistoryError] = useState(null);
  const [isDelegatorHistoryLoaded, setIsDelegatorHistoryLoaded] =
    useState(false);
  const [delegatorHistory, setDelegatorHistory] = useState<{
    [active_epoch: number]: number;
  }>({});

  useEffect(() => {
    fetch("http://localhost:3001/api/history")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsHistoryLoaded(true);
          setHistory(result);
          setCurrentEpoch(result.at(-1).epoch + 1);
        },
        (error) => {
          setIsHistoryLoaded(true);
          setHistoryError(historyError);
        }
      );
  }, [historyError]);

  useEffect(() => {
    !!stakingAddress &&
      fetch(`http://localhost:3001/api/delegatorHistory/${stakingAddress}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsDelegatorHistoryLoaded(true);
            setDelegatorHistory(stakingHistoryDict(result));
            setStakingHistory(Object.assign({}, delegatorHistory, stakedADA));
            console.log(Object.assign({}, delegatorHistory, stakedADA));
            
          },
          (error) => {
            setIsDelegatorHistoryLoaded(true);
            setDelegatorHistoryError(delegatorHistoryError);
          }
        );
  }, [delegatorHistoryError, stakedADA, stakingAddress]);

  const handleAnimation = () => {
    if (animationEffect === true) {
      return setAnimationEffect(false);
    }
  };

  return (
    <div className="gradient-bg min-w-screen min-h-screen">
      <Header />

      <div className="flex justify-center pt-16 pb-40">
        <img
          className={`${animationEffect && "animate-bounce"} w-3/12`}
          src={require("./images/anetaBTC_angel1.png")}
          alt="anetaBTC angel logo"
        />

        <div
          className="mx-10 my-auto flex flex-col text-left"
          // onAnimationEnd={handleAnimation}
        >
          <span className="pt-6 text-6xl font-bold text-anetaCyan">
            LISO Rewards Calculator
          </span>
          <span className="py-2 text-2xl">
            How much cNETA can you earn from staking your ADA with anetaBTC?
          </span>
          {/* <Calculator
            setRewards={setRewards}
            // setAnimationEffect={setAnimationEffect}
            // onAnimationEnd={handleAnimation}
            placeholder="Your Staked ADA"
            calculatorType={CalculatorType.StakedADA}
          />
          <span className="py-2 text-2xl">
            How much cNETA did you earn by staking your ADA with anetaBTC?
          </span>
          <Calculator
            setStakingAddress={setStakingAddress}
            placeholder="Your staking address: eg. stake1u0a1b2c3..."
            calculatorType={CalculatorType.StakingAddress}
          /> */}
          <Form
            setStakingAddress={setStakingAddress}
            setStakedADA={setStakedADA}
            currentEpoch={currentEpoch}
          />
        </div>

        <div
          className={`${
            Boolean(stakedADA[currentEpoch + 1]) ? "visible" : "invisible"
          } my-auto h-1/2 rounded-lg border-cardanoBlue bg-anetaCyan bg-opacity-60 px-6 pt-2 pb-3 text-center text-lg shadow-2xl shadow-anetaGold`}
        >
          <div className="flex flex-col items-center text-2xl font-semibold">
            <img
              className="w-28"
              src={require("./images/anetaBTC_logo.png")}
              alt="anetaBTC logo"
            ></img>
            {/* <span className="text-lg font-light">You will receive</span> */}
            <div className="flex flex-col">
              <span className="text-anetaGold">
                {Boolean(stakedADA[currentEpoch + 1]) &&
                  totalRewards(
                    Object.assign({}, delegatorHistory, stakedADA)
                  ).slice(-1)[0]}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-light">cNETA</span>
            <span className="font-light">
              over{" "}
              {totalRewards(Object.assign({}, delegatorHistory, stakedADA))
                .length - 1}{" "}
              epochs
            </span>
          </div>
        </div>
      </div>

      <div>
        {Boolean(stakedADA[currentEpoch + 1]) && (
          <LineAndBarGraph
            totalRewardsDict={Object.assign({}, delegatorHistory, stakedADA)}
            currentEpoch={currentEpoch}
          />
        )}
      </div>

      <div className="m-auto mt-24 mb-20 flex w-10/12">
        <TotalADAStaked
          historyError={historyError}
          isHistoryLoaded={isHistoryLoaded}
          history={history}
        />
        <Stakers
          historyError={historyError}
          isHistoryLoaded={isHistoryLoaded}
          history={history}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;

// TODO: add jump effect on angel
// TODO: Optimize for mobile
// TODO: Manage staking delay on Cardano +2 epochs
// TODO: Message on staking address not found
// TODO: Loading for components
// TODO: Error on loading

let curlNETA2 = `curl -H "project_id: mainnetJyhaAWMYuZAhpPPpPcslIX0LNMfwtjOK"  https://cardano-mainnet.blockfrost.io/api/v0/pools/pool15hx9hze8ulcsw6e7ceelz2pem2g3u9c29wqe4eszkhspj3wcdlx/history`;
let curlNETA2Delegators = `curl -H "project_id: mainnetJyhaAWMYuZAhpPPpPcslIX0LNMfwtjOK" https://cardano-mainnet.blockfrost.io/api/v0/pools/pool15hx9hze8ulcsw6e7ceelz2pem2g3u9c29wqe4eszkhspj3wcdlx/delegators `;
let curlStakeAdress = `curl -H "project_id: mainnetJyhaAWMYuZAhpPPpPcslIX0LNMfwtjOK" https://cardano-mainnet.blockfrost.io/api/v0/accounts/stake1u9tms56lc68wexmmylthe8vpxd4rts7wzp5x8lgl6ms2y6slert4t `;
