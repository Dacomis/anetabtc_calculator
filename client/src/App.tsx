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

      <div className="mx-auto flex flex-col justify-center py-6">
        <div className="mx-2 flex py-10">
          <img
            className={`${animationEffect && "animate-bounce"} w-11/12`}
            src={require("./images/anetaBTC_angel1.png")}
            alt="anetaBTC angel logo"
          />
          <div className="w-10/12">
            <div className="flex flex-col pt-6 text-left text-2xl font-bold text-anetaCyan">
              <span>LISO</span>
              <span>Rewards Calculator</span>
            </div>
            <div className="my-2 text-sm">
              An overview of your cNETA rewards
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-14 flex w-10/12 flex-col justify-center rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50">
          <Form
            setStakingAddress={setStakingAddress}
            setStakedADA={setStakedADA}
            currentEpoch={currentEpoch}
          />
        </div>

        <div
          className={`${
            Boolean(stakedADA[currentEpoch + 1]) ? "visible" : "hidden"
          } mx-auto mt-10 w-5/12 rounded-lg border-cardanoBlue bg-anetaCyan bg-opacity-60 py-2 text-center text-sm shadow-2xl shadow-anetaGold`}
        >
          <div className="flex flex-col items-center text-xl font-semibold">
            <img
              className="w-20"
              src={require("./images/anetaBTC_logo.png")}
              alt="anetaBTC logo"
            ></img>
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

      <div className="w-12/12 m-auto my-10 flex flex-col">
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
// TODO: Error on loading
// TODO: Instructions ans ? for form inputs